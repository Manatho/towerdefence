import { Graphics } from "../util/graphics";
import { IPositioned } from "../util/interfaces/i-positioned";
import { Point } from "../util/primitives/point";

export class Creep implements IPositioned {
  position: Point;
  dead: boolean = false;

  speed: number;
  health: number;
  reward: number;
  startingHealth: number;

  constructor(x: number, y: number, creepTemplate: CreepTemplate) {
    this.position = new Point(x, y);
    this.speed = creepTemplate.speed;
    this.health = creepTemplate.health;
    this.startingHealth = creepTemplate.health;
    this.reward = creepTemplate.reward;
  }

  render(graphics: Graphics) {
    graphics.fillRect(this.position.x, this.position.y, 0.1, 0.1, "#f0F");

    graphics.fillRect(
      this.position.x,
      this.position.y + 0.2,
      (this.health / this.startingHealth) * 0.5,
      0.1,
      "#f00"
    );
  }
}

export class CreepTemplate {
  constructor(
    readonly speed: number,
    readonly health: number,
    readonly reward: number
  ) {}
}
