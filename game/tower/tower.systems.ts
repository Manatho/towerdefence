import { CauseOfDeath, Creep } from "../creeps/creep";
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
  towers.forEach((tower) => {
    if (tower.nextShot < 0) {
      if (tower.target instanceof Creep) {
        tower.target.health -= 1;
        tower.target.dead = tower.target.health <= 0;
        if (tower.target.dead) {
          tower.target.causeOfDeath = CauseOfDeath.Shot;
        }
        tower.nextShot = tower.reload;
      }
    }
    tower.nextShot -= delta;
  });
}
