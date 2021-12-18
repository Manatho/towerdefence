<template>
  <div class="flex justify-center items-center">
    <canvas
      ref="gameCanvas"
      width="500"
      height="500"
      style="border: 1px solid #000000"
    >
    </canvas>
  </div>
</template>

<script lang="ts">
import { Game } from "~~/game/game";
import { GameInstanceSettings } from "~~/game/game-instance-settings/game-instance-settings";
import { Graphics } from "~~/game/util/graphics";

export default {
  mounted() {
    let canvas = this.$refs.gameCanvas as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    console.log(GameInstanceSettings);
    
    let graphics = new Graphics(canvas, ctx);
    let game = new Game(graphics);

    game.start();
  },
};
</script>
