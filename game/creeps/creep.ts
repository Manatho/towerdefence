import { Graphics } from "../util/graphics";
import { Point } from "../util/primitives/point";

export class Creep {
  position: Point;
  speed: number;
  dead: boolean = false;

  constructor(x: number, y: number, speed = 5) {
    this.position = new Point(x, y);
    this.speed = speed;
  }

  render(graphics: Graphics) {
    graphics.fillRect(
      this.position.x,
      this.position.y,
      0.1,
      0.1,
      "#f00"
    );
  }
}

export class CreepTemplate {
  constructor(readonly speed: number) {}
}
