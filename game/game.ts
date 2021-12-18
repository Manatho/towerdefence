import { GameInstanceSettings } from "./game-instance-settings/game-instance-settings";
import { Graphics } from "./util/graphics";

export class Game {
  constructor(readonly grapics: Graphics) {}

  start() {
    let currentMap = GameInstanceSettings.maps[0];

    currentMap.render(this.grapics);
  }
}
