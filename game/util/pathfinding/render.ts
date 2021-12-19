import { NavigationMap } from "~~/game/pathfinding/navigation-map";
import { PathfindingNode } from "~~/game/pathfinding/pathfinding";
import { Graphics } from "../graphics";

export function renderPath(NavigationMap: NavigationMap, graphics: Graphics) {
  let paths = Array.from(NavigationMap.nodes.values());
  paths.forEach((tile) => {
    let x = tile.point.x + 0.5;
    let y = tile.point.y + 0.5;

    let dx = tile.point.x - tile.parent?.x ?? 0;
    let dy = tile.point.y - tile.parent?.y ?? 0;

    if (tile.parent != null) {
      graphics.fillRect(x, y, 0.1, 0.1, "#ff0000");
      graphics.fillRect(x - dx * 0.1, y - dy * 0.1, 0.08, 0.08, "#00ff00");
    } else {
      graphics.fillRect(x, y, 0.2, 0.2, "#ffF000");
    }
  });
}
