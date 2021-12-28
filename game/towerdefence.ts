import { Creep } from "./creeps/creep";
import {
  deadCreepRemover,
  creepMover,
  creepBaseAttack,
} from "./creeps/creep.systems";
import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { LevelTemplate } from "./level/level";
import { GridMap } from "./map/grid-map";
import { NavigationMap } from "./pathfinding/navigation-map";
import { Pathfinder, PathfindingNode } from "./pathfinding/pathfinding";
import { Player } from "./player/player";
import { Tower } from "./tower/tower";
import { towerFire, towerUpdateTargets } from "./tower/tower.systems";
import { GameLoopController, Game } from "./util/gameloop/controller";
import { Graphics } from "./util/graphics";
import { renderPath } from "./util/pathfinding/render";
import { Point } from "./util/primitives/point";
import { Wave } from "./wave/wave";
import { nextWave, waveSpawner } from "./wave/wave.systems";
import { Waves } from "./wave/waves";

export class TowerDefence implements Game {
  constructor() {}

  controller: GameLoopController;

  currentLevel: LevelTemplate;
  currentMap: GridMap;

  currentNavigationMap: NavigationMap;

  waves: Waves;

  player = new Player(10);

  creeps: Creep[] = [];
  towers: Tower[] = [];

  start() {
    let level = Number(localStorage.getItem("level"));
    this.currentLevel = GameInstanceSettings.levels[level];

    this.currentMap = this.currentLevel.map;
    this.waves = new Waves(this.currentLevel.waves);

    this.currentNavigationMap = Pathfinder.djikstra(
      this.currentMap, //
      this.currentLevel.basePoint
    );
  }

  restart() {
    this.start();
    this.player = new Player(10);
    this.creeps = [];
    this.towers = [];
    this.currentLevel.map.collisionMap = new Map();
  }

  update() {
    waveSpawner(
      this.waves.currentWave,
      this.creeps,
      this.currentLevel.startPoint,
      this.controller.delta
    );

    this.creeps = creepMover(
      this.creeps,
      this.currentNavigationMap,
      this.controller.delta
    );
    creepBaseAttack(this.creeps, this.currentLevel.basePoint, this.player);

    towerUpdateTargets(this.towers, this.creeps);
    towerFire(this.controller.delta, this.towers, this.player);

    this.creeps = deadCreepRemover(this.creeps);

    nextWave(this.waves);
  }

  render(graphics: Graphics): void {
    this.currentMap.render(graphics);
    renderPath(this.currentNavigationMap, graphics);
    this.creeps.forEach((c) => c.render(graphics));
    this.towers.forEach((t) => t.render(graphics));
  }

  click(x: number, y: number) {
    let tower = new Tower(x, y);
    tower.target = { position: new Point(0, 0) };
    if (
      !this.currentMap.hasCollision(tower.position) &&
      this.player.resources >= 10
    ) {
      console.log("added");
      this.player.resources -= 10;
      this.towers.push(tower);
      this.currentMap.addCollision(tower.position, tower);
    } else {
      console.log("added not");
    }
  }
}
