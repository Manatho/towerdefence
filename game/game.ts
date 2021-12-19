import { Creep } from "./creeps/creep";
import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { GridMap } from "./map/grid-map";
import { Pathfinder, PathfindingNode } from "./pathfinding/pathfinding";
import { Graphics } from "./util/graphics";
import { renderPath } from "./util/pathfinding/render";
import { Point } from "./util/primitives/point";

export class Game {
  constructor(readonly graphics: Graphics) {}

  currentMap: GridMap;
  currentNavigationMap: PathfindingNode[];

  creeps: Creep[] = [];

  start() {
    this.currentMap = GameInstanceSettings.maps[0];

    let end = new Point(6, 9);
    let start = new Point(3, 0);
    this.currentNavigationMap = Pathfinder.djikstra(
      this.currentMap, //
      end
    );
    this.currentMap.render(this.graphics);
    //renderPath(this.currentNavigationMap, this.graphics);
  }

  click(x: number, y: number) {
    let mappedX = Math.floor(x / this.graphics.unitMultiplier);
    let mappedY = Math.floor(y / this.graphics.unitMultiplier);

    console.log(mappedX, mappedY);

    this.currentMap.render(this.graphics);
    let paths = Pathfinder.djikstra(
      this.currentMap,
      new Point(mappedX, mappedY)
    );

    renderPath(paths, this.graphics);
  }
}
