import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { GridMap, Point } from "./map/grid-map";
import { Pathfinder } from "./pathfinding/pathfinding";
import { Graphics } from "./util/graphics";
import { renderPath } from "./util/pathfinding/render";

export class Game {
  constructor(readonly graphics: Graphics) {}

  currentMap: GridMap;

  start() {
    this.currentMap = GameInstanceSettings.maps[0];
    this.currentMap.render(this.graphics);
  }

  click(x: number, y: number) {
    let mappedX = Math.floor(x / this.graphics.unitMultiplier);
    let mappedY = Math.floor(y / this.graphics.unitMultiplier);

    this.currentMap.render(this.graphics);
    let paths = Pathfinder.djikstra(
      this.currentMap,
      new Point(mappedX, mappedY)
    );

    renderPath(paths, this.graphics);
  }
}
