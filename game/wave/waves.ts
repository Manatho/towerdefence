import { Wave } from "./wave";

export class Waves {
  waves: Wave[];
  currentWaveIndex: number;

  constructor(waves: Wave[]) {
    this.waves = waves;
    this.currentWaveIndex = 0;
  }

  get currentWave() {
    return this.waves[this.currentWaveIndex];
  }

  get length() {
    return this.waves.length;
  }
}
