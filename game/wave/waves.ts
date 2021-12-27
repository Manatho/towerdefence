import { Wave } from "./wave";
import { WaveTemplate } from "./wave.template";

export class Waves {
  waves: Wave[];
  currentWaveIndex: number;

  constructor(templates: WaveTemplate[]) {
    this.waves = templates.map((w) => new Wave(w));
    this.currentWaveIndex = 0;
  }

  get currentWave() {
    return this.waves[this.currentWaveIndex];
  }

  get length() {
    return this.waves.length;
  }
}
