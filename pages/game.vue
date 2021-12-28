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
    </div>

    <div class="flex">
      <div class="w-32"></div>
      <canvas
        ref="gameCanvas"
        width="500"
        height="500"
        style="border: 1px solid #000000"
        @click="onClick"
      >
      </canvas>
      <div class="w-32 flex flex-col">
        <DefaultButton
          v-if="!started"
          class="mx-4 text-center mb-2"
          @click="start"
        >
          Start
        </DefaultButton>
        <DefaultButton class="mx-4 text-center mb-2" @click="pause">
          Pause
        </DefaultButton>
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

let game = null as TowerDefence;
let controller = null as GameLoopController;
let graphics = null as Graphics;

export default defineComponent({
  components: { DefaultButton },

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

    start() {
      this.started = true;
      game.start();

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
  },
});
</script>
