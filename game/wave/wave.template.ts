import { CreepTemplate } from "../creeps/creep";

export class WaveTemplateOption {
  constructor(
    readonly prepTime: number,
    readonly amount: number,
    readonly interval: number,
    readonly fightTime: number
  ) {}
}

export class WaveTemplate {
  constructor(
    readonly creepTemplate: CreepTemplate,
    private readonly options: WaveTemplateOption
  ) {}

  get prepTime() {
    return this.options.prepTime;
  }

  get amount() {
    return this.options.amount;
  }

  get interval() {
    return this.options.interval;
  }

  get fightTime() {
    return this.options.fightTime;
  }
}
