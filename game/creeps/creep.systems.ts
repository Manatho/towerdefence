import { NavigationMap } from "../pathfinding/navigation-map";
import { Player } from "../player/player";
import { Point } from "../util/primitives/point";
import { CauseOfDeath, Creep } from "./creep";

export function creepMover(
  creeps: Creep[],
  navigationMap: NavigationMap,
  delta: number
): Creep[] {
  creeps.forEach((creep) => {
    let node = navigationMap.get(creep.position);

    creep.distanceToGoal = node.distanceToRoot()

    let direction = Point.multiply(node.direction, creep.speed * delta);

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
      creep.causeOfDeath = CauseOfDeath.SelfDestruct;
    }
  });
}

export function deadCreepRemover(creeps: Creep[], player: Player) {
  let killedCreeps = creeps.filter((c) => c.causeOfDeath == CauseOfDeath.Shot);
  killedCreeps.forEach((c) => {
    player.resources += c.reward;
  });

  return creeps.filter((c) => !c.dead);
}
