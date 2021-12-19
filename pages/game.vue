<template>
  <div class="flex justify-center items-center">
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
        game.render(graphics);
      }
    );
  },

  methods: {
    onClick(e: MouseEvent) {
      var rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position within the element.

      game.click(x, y);
    },
  },
};
</script>
