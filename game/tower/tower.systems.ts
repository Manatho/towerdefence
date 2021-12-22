import { Creep } from "../creeps/creep";
import { Tower } from "./tower";

export function towerUpdateTargets(towers: Tower[], creeps: Creep[]) {
  if (creeps[0] != null) {
    towers.forEach((t) => (t.target = creeps[0]));
  }
}

export function towerFire(towers: Tower[]) {
  towers.forEach((t) => {
    if (t.target instanceof Creep) {
      t.target.health -= 1;
      t.target.dead = t.target.health <= 0;
    }
  });
}
