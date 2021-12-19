import { Creep, CreepTemplate } from "../creeps/creep";
import { GridMap } from "../map/grid-map";
import { Wave } from "../wave/wave";

let defaultMapTextures = ["#44b376", "#f0ecad", "#30a6d9", "#798c94"];

export const GameInstanceSettings = {
  maps: [],
  waves: [],
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

let wave1 = new Wave(new CreepTemplate(1), 5, 1);
GameInstanceSettings.waves.push(wave1);
