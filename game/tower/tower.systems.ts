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

export function towerFire(towers: Tower[], player: Player) {
  let now = Date.now();
  towers.forEach((t) => {
    if (now > t.lastShot + t.reload * 1000)
      if (t.target instanceof Creep) {
        t.target.health -= 1;
        t.target.dead = t.target.health <= 0;
        player.resources += t.target.health <= 0 ? t.target.reward : 0;
        t.lastShot = now;
      }
  });
}
