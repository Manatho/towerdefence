export type PointKey = string;
export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toKey() {
    return `${this.x}_${this.y}`;
  }

  subtract(other: Point): void {
    this.x -= other.x;
    this.y -= other.y;
  }

  add(other: Point): void {
    this.x += other.x;
    this.y += other.y;
  }

  static subtract(a: Point, b: Point): Point {
    return new Point(a.x - b.x, a.y - b.y);
  }

  multiply(speed: number) {
    this.x *= speed;
    this.y *= speed;
  }

  static multiply(a: Point, b: Point | number) {
    if (b instanceof Point) {
      return new Point(a.x * b.x, a.y * b.y);
    } else {
      return new Point(a.x * b, a.y * b);
    }
  }

  static floor(p: Point) {
    return new Point(Math.floor(p.x), Math.floor(p.y));
  }
}
