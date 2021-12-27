import { Creep } from "../creeps/creep";
import { Point } from "../util/primitives/point";
import { Wave, WaveState } from "./wave";
import { Waves } from "./waves";

export function waveSpawner(
  wave: Wave,
  creeps: Creep[],
  startPoint: Point,
  delta: number
) {
  if (wave.prepTime > 0) {
    wave.prepTime -= delta;
  } else if (wave.spawned < wave.amount) {
    wave.nextSpawn -= delta;
    if (wave.nextSpawn <= 0) {
      wave.nextSpawn = wave.interval;
      wave.spawned++;
      creeps.push(new Creep(startPoint.x, startPoint.y, wave.creepTemplate));
    }
  } else if (wave.fightTime > 0) {
    wave.fightTime -= delta;
  }
}

export function nextWave(waves: Waves) {
  if (
    waves.currentWave.state == WaveState.Finished &&
    waves.currentWaveIndex < waves.length - 1 
  ) {
    waves.currentWaveIndex++;
  }
}
