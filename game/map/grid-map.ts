import { GameInstanceSettings } from "../game-instance-settings/game-instance-settings";
import { Graphics } from "../util/graphics";
import { Point, PointKey } from "../util/primitives/point";

export type Grid = number[][];

export class GridMap {
  grid: Grid;
  textures: string[] = [];

  collisionMap: Map<PointKey, any> = new Map();

  constructor(grid: Grid, textures: string[]) {
    this.grid = grid;
    this.textures = textures;
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

  addCollision(point: Point, element: any) {
    this.collisionMap.set(point.toKey(), element);
  }

  getCollision<T>(point: Point): T | null {
    return this.collisionMap.get(point.toKey());
  }

  hasCollision(point: Point): boolean {
    return this.collisionMap.has(point.toKey());
  }
}
