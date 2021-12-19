import { Creep } from "../creeps/creep";
import { Point } from "../util/primitives/point";
import { Wave } from "./wave";

export function waveSpawner(
  wave: Wave,
  creeps: Creep[],
  startPoint: Point,
  delta: number
) {
  wave.nextSpawn -= delta;
  if (wave.nextSpawn <= 0 && wave.spawned < wave.amount) {
    wave.nextSpawn = wave.interval;
    wave.spawned++;
    creeps.push(new Creep(startPoint.x, startPoint.y, wave.template.speed));
  }
}
