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
}
