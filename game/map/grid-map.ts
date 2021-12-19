import { GameInstanceSettings } from "../game-instance-settings/game-instance-settings";
import { Graphics } from "../util/graphics";

export type Grid = number[][];

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toKey() {
    return `${this.x}_${this.y}`;
  }
}

export class GridMap {
  grid: Grid;
  textures: string[] = [];

  constructor(grid: Grid) {
    this.grid = grid;
    this.textures = GameInstanceSettings.defaultMapTextures;
  }

  getTile(point: Point) {
    let row = this.grid[point.y];

    if (
      row == undefined ||
      point.x > row.length ||
      point.y < 0 ||
      point.x < 0
    ) {
      return undefined;
    } else {
      // path tile is 3
      if (row[point.x] == 3) {
        return row[point.x];
      } else {
        return undefined;
      }
    }
  }

  render(graphics: Graphics) {
    this.grid.forEach((row, y) => {
      row.forEach((tile, x) => {
        graphics.fillRect(x, y, 1, 1, this.textures[tile]);
      });
    });
  }
}
