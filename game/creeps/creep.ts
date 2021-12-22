import { Graphics } from "../util/graphics";
import { IPositioned } from "../util/interfaces/i-positioned";
import { Point } from "../util/primitives/point";

export class Creep implements IPositioned {
  position: Point;
  dead: boolean = false;

  speed: number;
  health: number;

  constructor(x: number, y: number, speed = 5, health = 10) {
    this.position = new Point(x, y);
    this.speed = speed;
    this.health = health;
  }

  render(graphics: Graphics) {
    graphics.fillRect(this.position.x, this.position.y, 0.1, 0.1, "#f0F");
  }
}

export class CreepTemplate {
  constructor(readonly speed: number) {}
}
