import { Creep, CreepTemplate } from "../creeps/creep";
import { GridMap } from "../map/grid-map";
import { Wave } from "../wave/wave";
import { WaveTemplate } from "../wave/wave.template";

let defaultMapTextures = ["#44b376", "#f0ecad", "#30a6d9", "#798c94"];

export const GameInstanceSettings = {
  maps: [],
  waves: [] as WaveTemplate[],
  defaultMapTextures: defaultMapTextures,
};

let map1 = new GridMap([
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
]);

GameInstanceSettings.maps.push(map1);

let wave1 = new WaveTemplate(new CreepTemplate(1, 10, 5), {
  amount: 5,
  interval: 1,
  prepTime: 2,
  fightTime: 2,
});

let wave2 = new WaveTemplate(new CreepTemplate(2, 10, 5), {
  amount: 10,
  interval: 1,
  prepTime: 5,
  fightTime: 10,
});

GameInstanceSettings.waves.push(wave1);
GameInstanceSettings.waves.push(wave2);
