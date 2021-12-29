import { CauseOfDeath, Creep } from "../creeps/creep";
import { Player } from "../player/player";
import { Point } from "../util/primitives/point";
import { Tower } from "./tower";

export function towerUpdateTargets(towers: Tower[], creeps: Creep[]) {
  towers.forEach((tower) => {
    tower.target = null;
    let closest = Number.MAX_VALUE;
    creeps.forEach((creep) => {
      let distance = Point.distance(tower.towerTurretPosition, creep.position);
      if (distance < tower.range && creep.distanceToGoal < closest) {
        closest = creep.distanceToGoal;

        tower.target = creep;
      }
    });
  });
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
