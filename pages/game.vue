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
import { Game } from "~~/game/game";
import { GameInstanceSettings } from "~~/game/game-instance-settings/game-instance-settings";
import { Graphics } from "~~/game/util/graphics";

let game = null as Game;
let graphics = null as Graphics;

export default {
  mounted() {
    let canvas = this.$refs.gameCanvas as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    graphics = new Graphics(canvas, ctx);
    game = new Game(graphics);

    game.start();
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
