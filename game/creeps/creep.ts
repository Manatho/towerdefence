import { Graphics } from "../util/graphics";
import { Point } from "../util/primitives/point";

export class Creep {
  position: Point;
  speed: number;
  dead: boolean;

  constructor(x: number, y: number) {
    this.position = new Point(x, y);
    this.speed = 5;
    this.dead = false;
  }

  render(graphics: Graphics) {
    graphics.fillRect(
      this.position.x + 0.35,
      this.position.y + 0.35,
      0.3,
      0.3,
      "#f00"
    );
  }
}
