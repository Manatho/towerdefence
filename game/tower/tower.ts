import { Graphics } from "../util/graphics";
import { IPositioned } from "../util/interfaces/i-positioned";
import { Point } from "../util/primitives/point";

export class Tower {
  position: Point;
  target: IPositioned;

  reload: number;
  lastShot: number;

  constructor(x: number, y: number) {
    this.position = new Point(x, y);
    this.reload = 0.4;
    this.lastShot = Date.now();
  }

  render(graphics: Graphics) {
    graphics.fillRect(
      this.position.x + 0.25, //
      this.position.y + 0.25,
      0.5,
      0.5,
      "#ccc"
    );

    let progress =
      Math.min((Date.now() - this.lastShot) / (this.reload * 1000), 1) * 0.6;

    graphics.fillRect(
      this.position.x + 0.2,
      this.position.y + 0.9,
      progress,
      0.05,
      "#fff"
    );

    let center = Point.add(this.position, 0.5);

    let angle = Point.angle(center, this.target?.position ?? new Point(0,0));
    let turretEnd = Point.add(
      center,
      new Point(-Math.cos(angle), -Math.sin(angle)).multiply(0.5)
    );

    graphics.strokeLine(center, turretEnd, 4, "#555");
  }
}
