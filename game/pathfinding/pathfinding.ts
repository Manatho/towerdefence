import { Grid, GridMap, Point } from "../map/grid-map";

class Entry {
  constructor(
    readonly point: Point,
    readonly cost: number,
    readonly parent?: Point
  ) {}

  get neighbours(): Point[] {
    return [
      new Point(this.point.x + 1, this.point.y), //
      new Point(this.point.x - 1, this.point.y),
      new Point(this.point.x, this.point.y + 1),
      new Point(this.point.x, this.point.y - 1),
    ];
  }
}

type QueueElement<T> = { element: T; priority: number };
class PriorityQueue<T> {
  private queue: QueueElement<T>[] = [];

  get length() {
    return this.queue.length;
  }

  enqueue(entry: T, priority: number) {
    this.queue.push({ element: entry, priority });
  }

  dequeue(): T {
    let bestIndex = 0;

    this.queue.forEach((e, i) => {
      if (e.priority < this.queue[bestIndex].priority) {
        bestIndex = i;
      }
    });

    return this.queue.splice(bestIndex, 1)[0].element;
  }
}

function djikstra(map: GridMap, start: Point): Entry[] {
  let tiles = new Map<string, Entry>();
  let openList = new PriorityQueue<Entry>();

  tiles.set(start.toKey(), new Entry(start, 0));
  openList.enqueue(tiles.get(start.toKey()), 0);

  let i = 0;
  while (openList.length > 0 && i < 1000) {
    i++;
    let current = openList.dequeue();

    current.neighbours.forEach((point) => {
      // Only consider non-visited and existing tiles
      if (!tiles.has(point.toKey()) && map.getTile(point) !== undefined) {
        let cost = current.cost + 1;

        let entry = new Entry(point, cost, current.point);
        tiles.set(point.toKey(), entry);
        openList.enqueue(entry, cost);
      }
    });
  }

  return Array.from(tiles.values());
}

export class Pathfinder {
  static djikstra(map: GridMap, start: Point): Entry[] {
    return djikstra(map, start);
  }
}
