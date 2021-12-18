import { GridMap } from "../map/grid-map";

let defaultMapTextures = ["#44b376", "#f0ecad", "#30a6d9", "#798c94" ];

export const GameInstanceSettings = {
  maps: [],
  defaultMapTextures: defaultMapTextures,
};

let map1 = new GridMap([
  [0, 0, 0, 3, 0, 0, 0, 0], //
  [1, 0, 0, 3, 0, 0, 0, 0],
  [2, 1, 0, 3, 3, 3, 0, 0],
  [2, 2, 1, 0, 0, 3, 0, 0],
  [2, 2, 1, 0, 0, 3, 0, 0],
  [2, 2, 1, 0, 0, 3, 3, 0],
  [2, 2, 2, 1, 0, 0, 3, 0],
  [2, 2, 2, 2, 1, 0, 3, 0],
]);

GameInstanceSettings.maps.push(map1);
