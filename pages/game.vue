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
    </div>

    <canvas
      ref="gameCanvas"
      width="500"
      height="500"
      style="border: 1px solid #000000"
      @click="onClick"
    >
    </canvas>
  </div>
</template>

<script lang="ts">
import { TowerDefence } from "~~/game/towerdefence";
import { Graphics } from "~~/game/util/graphics";
import { GameLoopController } from "~~/game/util/gameloop/controller";
import { WaveState } from "~~/game/wave/wave";

let game = null as TowerDefence;
let controller = null as GameLoopController;
let graphics = null as Graphics;

export default {
  mounted() {
    let canvas = this.$refs.gameCanvas as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    graphics = new Graphics(canvas, ctx);

    game = new TowerDefence();
    controller = new GameLoopController(game, 0);
    controller.speed = 1 / 60;

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

        game.render(graphics);
      }
    );
  },

  data() {
    return {
      prepTime: 0,
      fightTime: 0,
      state: WaveState.Prepping,
      wave: 0,
      totalWaves: 0,
      health: 0,
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
  },
};
</script>
