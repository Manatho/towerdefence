import { GameInstanceSettings } from "../game-instance-settings/game-instance-settings";
import { Graphics } from "../util/graphics";

export type Grid = number[][];

export class GridMap {
  grid: Grid;
  textures: string[] = [];

  constructor(grid: Grid) {
    this.grid = grid;
    this.textures = GameInstanceSettings.defaultMapTextures;
  }

  render(graphics: Graphics) {
    this.grid.forEach((row, y) => {
      row.forEach((tile, x) => {
        graphics.fillRect(x, y, 1, 1, this.textures[tile]);
      });
    });
  }
}
