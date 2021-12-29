import { Point } from "./primitives/point";

export class Graphics {
  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly ctx: CanvasRenderingContext2D
  ) {}

  unitMultiplier = 50;

  fillRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color?: string
  ) {
    if (color) {
      this.ctx.fillStyle = color;
    }

    this.ctx.fillRect(
      x * this.unitMultiplier,
      y * this.unitMultiplier,
      width * this.unitMultiplier,
      height * this.unitMultiplier
    );
  }

  fillCircle(x: number, y: number, radius: number, color: string) {
    this.ctx.beginPath();
    this.ctx.arc(
      x * this.unitMultiplier,
      y * this.unitMultiplier,
      radius * this.unitMultiplier,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  strokeLine(p1: Point, p2: Point, width: number, color: string) {
    p1 = Point.multiply(p1, this.unitMultiplier);
    p2 = Point.multiply(p2, this.unitMultiplier);

    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);

    this.ctx.stroke();
  }
}
