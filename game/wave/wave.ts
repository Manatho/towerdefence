import { Creep, CreepTemplate } from "../creeps/creep";
import { Point } from "../util/primitives/point";

export class Wave {
  template: CreepTemplate;
  amount: number;

  interval: number;
  nextSpawn: number = 0;

  spawned: number = 0;

  constructor(template: CreepTemplate, amount: number, interval: number) {
    this.template = template;
    this.interval = interval;
    this.amount = amount;
  }
}
