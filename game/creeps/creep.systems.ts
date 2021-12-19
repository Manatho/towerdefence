import { NavigationMap } from "../pathfinding/navigation-map";
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

export function deadCreepRemover(creeps: Creep[]) {
  return creeps.filter((c) => !c.dead);
}
