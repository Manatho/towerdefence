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
      <div class="w-40"></div>
      <div class="relative">
        <canvas
          ref="gameCanvas"
          width="500"
          height="500"
          style="border: 1px solid #000000"
          @click="onClick"
          @mousemove="onMove"
        />
        <div v-if="lost || won" class="absolute top-0 bottom-0 left-0 right-0">
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
              <span class="text-on-primary text-3xl">{{
                lost ? "Lost" : "Won"
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-40 p-2 flex flex-col">
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
          :disabled="lost || won"
        >
          Pause
        </DefaultButton>

        <div class="flex justify-center">
          <SpeedSelector :disabled="lost || won" @selected="onSelected" />
        </div>
        <TowerInfo :key="frame" :tower="tower" />

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
import { renderPath } from "~~/game/util/pathfinding/render";
import { Tower } from "~~/game/tower/tower";
import TowerInfo from "~~/components/towers/TowerInfo.vue";

let game = null as TowerDefence;
let towerRef = null as Tower;
let controller = null as GameLoopController;
let graphics = null as Graphics;

export default defineComponent({
  components: {
    DefaultButton,
    SpeedSelector,
    TowerInfo,
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
      won: false,
      tower: null as Tower,
      frame: 0,
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
    onMove(e: MouseEvent) {
      let rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      let gameX = Math.floor(x / graphics.unitMultiplier);
      let gameY = Math.floor(y / graphics.unitMultiplier);

      let tower = game.getTowerAt(gameX, gameY);
      towerRef = tower;
    },

    onSelected(speed: number) {
      controller.deltaMultiplier = speed;
    },

    start() {
      this.started = true;
      game.start();

      this.addEventListeners();

      controller.startLoop(
        () => {
          this.tower = null;
        },
        () => {
          let currentWave = game.waves.currentWave;
          this.prepTime = currentWave.prepTime;
          this.fightTime = currentWave.fightTime;
          this.state = currentWave.state;
          this.wave = game.waves.currentWaveIndex + 1;
          this.totalWaves = game.waves.waves.length;

          this.frame = controller.frame;

          if (towerRef != null) {
            this.tower = { ...towerRef };
          } else {
            this.tower = null;
          }

          this.health = game.player.health;
          this.resources = game.player.resources;
          this.renderGame();
        }
      );
    },
    restart() {
      game.restart();
      this.addEventListeners();
      this.lost = false;
      this.won = false;
      if (!controller.isRunning) {
        controller.togglePause();
      }
    },
    renderGame() {
      game.currentMap.render(graphics);
      renderPath(game.currentNavigationMap, graphics);
      game.creeps.forEach((c) => c.render(graphics));
      game.towers.forEach((t) => t.render(graphics));
      if (towerRef != null) {
        towerRef.renderRange(graphics);
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
        this.pause();
        this.won = true;
      });

      TowerDefence.events.on("lost", () => {
        this.pause();
        this.lost = true;
      });
    },
  },
});
</script>
