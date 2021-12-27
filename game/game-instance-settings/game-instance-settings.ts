import { CreepTemplate } from "../creeps/creep";
import { LevelTemplate } from "../level/level";
import { GridMap } from "../map/grid-map";
import { Point } from "../util/primitives/point";
import { WaveTemplate } from "../wave/wave.template";

let defaultMapTextures = ["#44b376", "#f0ecad", "#30a6d9", "#798c94"];

export const GameInstanceSettings = {
  levels: [] as LevelTemplate[],
};

let map1 = new GridMap(
  [
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //
    [1, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 3, 3, 3, 0, 0, 0, 0],
    [2, 2, 1, 0, 0, 3, 0, 0, 0, 0],
    [2, 2, 1, 0, 0, 3, 0, 0, 0, 0],
    [2, 2, 1, 0, 0, 3, 3, 0, 0, 0],
    [2, 2, 2, 1, 0, 0, 3, 0, 0, 0],
    [2, 2, 2, 2, 1, 0, 3, 0, 0, 0],
    [2, 2, 2, 2, 1, 0, 3, 0, 0, 0],
    [2, 2, 2, 2, 1, 0, 3, 0, 0, 0],
  ],
  defaultMapTextures
);

let wave1_1 = new WaveTemplate(new CreepTemplate(1, 10, 5), {
  amount: 5,
  interval: 1,
  prepTime: 2,
  fightTime: 2,
});

let wave2_1 = new WaveTemplate(new CreepTemplate(2, 10, 5), {
  amount: 10,
  interval: 1,
  prepTime: 5,
  fightTime: 10,
});

let level1 = new LevelTemplate(
  map1, //
  new Point(6, 9),
  new Point(3, 0),
  [wave1_1, wave2_1]
);
GameInstanceSettings.levels.push(level1);

let map2 = new GridMap(
  [
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 0], //
    [1, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 3, 3, 3, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 3, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 3, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 3, 3, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 3, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 3, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 3, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 3, 0, 0, 0],
  ],
  defaultMapTextures
);

let wave1_2 = new WaveTemplate(new CreepTemplate(1, 10, 5), {
  amount: 5,
  interval: 1,
  prepTime: 2,
  fightTime: 2,
});

let wave2_2 = new WaveTemplate(new CreepTemplate(2, 10, 5), {
  amount: 10,
  interval: 1,
  prepTime: 5,
  fightTime: 10,
});

let level2 = new LevelTemplate(
  map2, //
  new Point(6, 9),
  new Point(3, 0),
  [wave1_2, wave2_2]
);

GameInstanceSettings.levels.push(level2);
