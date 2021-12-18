export class Graphics {
  constructor(
    readonly canvas: HTMLCanvasElement,
    readonly ctx: CanvasRenderingContext2D
  ) {}

  size = 50;

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
      x * this.size,
      y * this.size,
      width * this.size,
      height * this.size
    );
  }
}
