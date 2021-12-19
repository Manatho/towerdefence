import { Point, PointKey } from "../util/primitives/point";
import { PathfindingNode } from "./pathfinding";

export class NavigationMap {
  nodes: Map<PointKey, PathfindingNode>;

  constructor(nodes: Map<PointKey, PathfindingNode>) {
    this.nodes = nodes;
  }

  get(position: Point): PathfindingNode {
    return this.nodes.get(Point.floor(position).toKey());
  }
}
