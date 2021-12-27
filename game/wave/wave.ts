import { CreepTemplate } from "../creeps/creep";
import { WaveTemplate } from "./wave.template";

export enum WaveState {
  Prepping = "Prepping",
  Spawning = "Spawning",
  Fighting = "Fighting",
  Finished = "Finished",
}

export class Wave {
  private template: WaveTemplate;

  nextSpawn: number = 0;
  spawned: number = 0;

  prepTime: number;
  fightTime: number;

  constructor(template: WaveTemplate) {
    this.template = template;
    this.prepTime = template.prepTime;
    this.fightTime = template.fightTime;
  }

  get interval() {
    return this.template.interval;
  }

  get amount() {
    return this.template.amount;
  }

  get creepTemplate() {
    return this.template.creepTemplate;
  }

  get state(): WaveState {
    if (this.prepTime > 0) {
      return WaveState.Prepping;
    } else if (this.spawned < this.amount) {
      return WaveState.Spawning;
    } else if (this.fightTime > 0) {
      return WaveState.Fighting;
    } else {
      return WaveState.Finished;
    }
  }
}
