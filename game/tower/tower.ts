import { Graphics } from "../util/graphics";
import { IPositioned } from "../util/interfaces/i-positioned";
import { Point } from "../util/primitives/point";

export class Tower {
  position: Point;
  target: IPositioned;

  constructor(x: number, y: number) {
    this.position = new Point(x, y);
  }

  render(graphics: Graphics) {
    graphics.fillRect(
      this.position.x + 0.25, //
      this.position.y + 0.25,
      0.5,
      0.5,
      "#ccc"
    );

    let center = Point.add(this.position, 0.5);

    let angle = Point.angle(center, this.target.position);
    let turretEnd = Point.add(
      center,
      new Point(-Math.cos(angle), -Math.sin(angle)).multiply(0.5)
    );

    graphics.strokeLine(center, turretEnd, 4, "#555");
  }
}
