import { NavigationMap } from "../pathfinding/navigation-map";
import { Player } from "../player/player";
import { Point } from "../util/primitives/point";
import { Creep } from "./creep";

export function creepMover(
  creeps: Creep[],
  navigationMap: NavigationMap,
  delta: number
): Creep[] {
  creeps.forEach((creep) => {
    let node = navigationMap.get(creep.position);

    let direction = Point.multiply(node.direction, creep.speed * delta);

    if (node.direction.x == 0 && node.direction.y == 0) {
      creep.dead = true;
    }

    creep.position.add(direction);
  });
  return creeps;
}

export function creepBaseAttack(
  creeps: Creep[],
  basePosition: Point,
  player: Player
) {
  creeps.forEach((creep) => {
    let creepFlored = Point.floor(creep.position);
    if (creepFlored.x == basePosition.x && creepFlored.y == basePosition.y) {
      player.health--;
      creep.dead = true;
    }
  });
}

export function deadCreepRemover(creeps: Creep[]) {
  return creeps.filter((c) => !c.dead);
}
