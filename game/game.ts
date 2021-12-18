import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { GridMap, Point } from "./map/grid-map";
import { Pathfinder } from "./pathfinding/pathfinding";
import { Graphics } from "./util/graphics";

export class Game {
  constructor(readonly graphics: Graphics) {}

  currentMap: GridMap;

  start() {
    this.currentMap = GameInstanceSettings.maps[0];
    this.currentMap.render(this.graphics);
  }

  click(x: number, y: number) {
    let mappedX = Math.floor(x / this.graphics.unitMultiplier);
    let mappedY = Math.floor(y / this.graphics.unitMultiplier);

    this.currentMap.render(this.graphics);
    let paths = Pathfinder.djikstra(
      this.currentMap,
      new Point(mappedX, mappedY)
    );

    paths.forEach((tile) => {
      let x = tile.point.x + 0.5;
      let y = tile.point.y + 0.5;

      let dx = tile.point.x - tile.parent?.x ?? 0;
      let dy = tile.point.y - tile.parent?.y ?? 0;

      if (tile.parent != null) {
        this.graphics.fillRect(x, y, 0.1, 0.1, "#ff0000");
        this.graphics.fillRect(x - dx * 0.1, y - dy * 0.1, 0.08, 0.08, "#00ff00");
      } else {
        this.graphics.fillRect(x, y, 0.2, 0.2, "#ffF000");
      }
    });
  }
}
