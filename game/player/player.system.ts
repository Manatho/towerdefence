import { Creep } from "../creeps/creep";
import { TowerDefence } from "../towerdefence";
import { WaveState } from "../wave/wave";
import { Waves } from "../wave/waves";
import { Player } from "./player";

export function playerState(player: Player, waves: Waves, creeps: Creep[]) {
  if (player.health <= 0) {
    if (!player.dead) {
      TowerDefence.events.emit("lost");
    }
    player.dead = true;
  }
  if (waves.currentWaveIndex == waves.length - 1) {
    if (waves.currentWave.state == WaveState.Finished) {
      if (creeps.length == 0) {
        if (!player.dead) {
          TowerDefence.events.emit("won");
        }
      }
    }
  }
}
