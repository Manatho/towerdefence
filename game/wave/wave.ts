import { CreepTemplate } from "../creeps/creep";

export enum WaveState {
  Prepping = "Prepping",
  Spawning = "Spawning",
  Fighting = "Fighting",
  Finished = "Finished",
}

export class Wave {
  template: CreepTemplate;
  amount: number;

  interval: number;
  nextSpawn: number = 0;

  spawned: number = 0;
  prepTime: number;

  fightTime: number;

  constructor(
    template: CreepTemplate,
    options: {
      prepTime: number;
      amount: number;
      interval: number;
      fightTime: number;
    }
  ) {
    this.template = template;
    this.prepTime = options.prepTime;
    this.fightTime = options.fightTime;
    this.interval = options.interval;
    this.amount = options.amount;
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
