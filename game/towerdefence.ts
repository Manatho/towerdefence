import { Creep } from "./creeps/creep";
import { deadCreepRemover, creepMover } from "./creeps/creep.systems";
import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { GridMap } from "./map/grid-map";
import { NavigationMap } from "./pathfinding/navigation-map";
import { Pathfinder, PathfindingNode } from "./pathfinding/pathfinding";
import { GameLoopController, Game } from "./util/gameloop/controller";
import { Graphics } from "./util/graphics";
import { renderPath } from "./util/pathfinding/render";
import { Point } from "./util/primitives/point";

export class TowerDefence implements Game {
  constructor() {}

  controller: GameLoopController;
  currentMap: GridMap;
  currentNavigationMap: NavigationMap;

  creeps: Creep[] = [];

  start() {
    this.currentMap = GameInstanceSettings.maps[0];

    let end = new Point(6, 9);
    let start = new Point(3, 0);
    this.currentNavigationMap = Pathfinder.djikstra(
      this.currentMap, //
      end
    );

    this.creeps.push(new Creep(start.x, start.y));
  }

  update() {
    this.creeps = creepMover(this.creeps, this.currentNavigationMap, this.controller.delta);
    this.creeps = deadCreepRemover(this.creeps);
  }

  render(graphics: Graphics): void {
    this.currentMap.render(graphics);
    renderPath(this.currentNavigationMap, graphics);
    this.creeps.forEach((c) => c.render(graphics));
  }

  click(x: number, y: number) {
    /*  let mappedX = Math.floor(x / this.graphics.unitMultiplier);
    let mappedY = Math.floor(y / this.graphics.unitMultiplier);

    console.log(mappedX, mappedY);

    this.currentMap.render(this.graphics);
    let paths = Pathfinder.djikstra(
      this.currentMap,
      new Point(mappedX, mappedY)
    );

    renderPath(paths, this.graphics); */
  }
}
