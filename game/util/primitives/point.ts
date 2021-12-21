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

  static subtract(a: Point, b: Point): Point {
    return new Point(a.x - b.x, a.y - b.y);
  }

  add(other: Point): void {
    this.x += other.x;
    this.y += other.y;
  }

  static add(a: Point, b: Point | number): Point {
    if (b instanceof Point) {
      return new Point(a.x + b.x, a.y + b.y);
    } else {
      return new Point(a.x + b, a.y + b);
    }
  }

  multiply(amount: number): Point {
    this.x *= amount;
    this.y *= amount;
    return this;
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

  static angle(p1: Point, p2: Point) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.atan2(dy, dx);
  }
}
