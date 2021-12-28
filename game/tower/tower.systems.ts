import { Creep } from "../creeps/creep";
import { Player } from "../player/player";
import { Tower } from "./tower";

export function towerUpdateTargets(towers: Tower[], creeps: Creep[]) {
  if (creeps[0] != null) {
    towers.forEach((t) => (t.target = creeps[0]));
  } else {
    towers.forEach((t) => (t.target = null));
  }
}

export function towerFire(delta: number, towers: Tower[], player: Player) {
  towers.forEach((t) => {
    if (t.nextShot < 0) {
      if (t.target instanceof Creep) {
        t.target.health -= 1;
        t.target.dead = t.target.health <= 0;
        player.resources += t.target.health <= 0 ? t.target.reward : 0;
        t.nextShot = t.reload;
      }
    }
    t.nextShot -= delta;
  });
}
