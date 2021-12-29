<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex gap-4">
      <span>{{ state }}</span>
      <span>Time until spawn: {{ prepTime.toFixed(0) }}</span>
      <span>Time until next wave: {{ fightTime.toFixed(0) }}</span>
    </div>
    <div class="flex gap-4">
      <span>waves: {{ wave }} / {{ totalWaves }}</span>
      <span>hp: {{ health }}</span>
      <span>resources: {{ resources }}</span>
      <span>state: {{ lost ? "Lost" : "Playing" }}</span>
    </div>

    <div class="flex">
      <div class="w-32"></div>
      <div class="relative">
        <canvas
          ref="gameCanvas"
          width="500"
          height="500"
          style="border: 1px solid #000000"
          @click="onClick"
        />
        <div v-if="lost" class="absolute top-0 bottom-0 left-0 right-0">
          <div
            class="absolute z-0 bg-primary-light opacity-50 h-full w-full"
          ></div>
          <div
            class="flex justify-center items-center relative z-10 h-full w-full"
          >
            <div
              class="
                flex
                justify-center
                items-center
                bg-primary-dark
                h-52
                w-sm
                rounded-md
              "
            >
              <span class="text-on-primary text-3xl">Lost</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-32 flex flex-col">
        <DefaultButton
          v-if="!started"
          class="mx-4 text-center mb-2"
          @click="start"
        >
          Start
        </DefaultButton>
        <DefaultButton
          class="mx-4 text-center mb-2"
          @click="pause"
          :disabled="lost"
        >
          Pause
        </DefaultButton>

        <div class="flex justify-center">
          <SpeedSelector :disabled="lost" @selected="onSelected" />
        </div>

        <div class="flex-grow" />
        <DefaultButton class="mx-4 text-center mb-2" @click="restart">
          Restart
        </DefaultButton>
        <DefaultButton class="mx-4 text-center" @click="quit">
          Quit
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TowerDefence } from "~~/game/towerdefence";
import { Graphics } from "~~/game/util/graphics";
import { GameLoopController } from "~~/game/util/gameloop/controller";
import { WaveState } from "~~/game/wave/wave";
import DefaultButton from "~~/components/common/buttons/DefaultButton.vue";
import SpeedSelector from "~~/components/SpeedSelector.vue";

let game = null as TowerDefence;
let controller = null as GameLoopController;
let graphics = null as Graphics;

export default defineComponent({
  components: {
    DefaultButton,
    SpeedSelector,
  },

  mounted() {
    let canvas = this.$refs.gameCanvas as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    graphics = new Graphics(canvas, ctx);

    game = new TowerDefence();
    controller = new GameLoopController(game, 0);
    controller.targetFrameTime = 1 / 60;
  },

  data() {
    return {
      prepTime: 0,
      fightTime: 0,
      state: WaveState.Prepping,
      wave: 0,
      totalWaves: 0,
      health: 0,
      resources: 0,
      started: false,
      lost: false,
    };
  },

  methods: {
    onClick(e: MouseEvent) {
      let rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let gameX = Math.floor(x / graphics.unitMultiplier);
      let gameY = Math.floor(y / graphics.unitMultiplier);

      game.click(gameX, gameY);
    },

    onSelected(speed: number) {
      controller.deltaMultiplier = speed;
    },

    start() {
      this.started = true;
      game.start();

      this.addEventListeners();

      controller.startLoop(
        () => {},
        () => {
          let currentWave = game.waves.currentWave;
          this.prepTime = currentWave.prepTime;
          this.fightTime = currentWave.fightTime;
          this.state = currentWave.state;
          this.wave = game.waves.currentWaveIndex + 1;
          this.totalWaves = game.waves.waves.length;

          this.health = game.player.health;
          this.resources = game.player.resources;
          game.render(graphics);
        }
      );
    },
    restart() {
      game.restart();
      this.addEventListeners();
      this.lost = false;
      if (!controller.isRunning) {
        controller.togglePause();
      }
    },
    quit() {
      this.$router.replace("/");
      controller.stop();
    },
    pause() {
      setTimeout(() => {
        controller.togglePause();
      }, 100);
    },
    addEventListeners() {
      TowerDefence.events.on("won", () => {
        console.log("won");
      });

      TowerDefence.events.on("lost", () => {
        this.pause();
        this.lost = true;
      });
    },
  },
});
</script>
