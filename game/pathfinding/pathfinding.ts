import { Grid, GridMap, Point } from "../map/grid-map";

export class PathfindingNode {
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

function djikstra(map: GridMap, start: Point): PathfindingNode[] {
  let closedList = new Map<string, PathfindingNode>();
  let openList = new PriorityQueue<PathfindingNode>();

  closedList.set(start.toKey(), new PathfindingNode(start, 0));
  openList.enqueue(closedList.get(start.toKey()), 0);

  let i = 0;
  while (openList.length > 0 && i < 1000) {
    i++;
    let current = openList.dequeue();

    current.neighbours.forEach((point) => {
      // Only consider non-visited and existing tiles
      if (!closedList.has(point.toKey()) && map.getTile(point) !== undefined) {
        let cost = current.cost + 1;

        let node = new PathfindingNode(point, cost, current.point);
        closedList.set(point.toKey(), node);
        openList.enqueue(node, cost);
      }
    });
  }

  return Array.from(closedList.values());
}

export class Pathfinder {
  static djikstra(map: GridMap, start: Point): PathfindingNode[] {
    return djikstra(map, start);
  }
}
