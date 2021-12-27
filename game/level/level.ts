import { GridMap } from "../map/grid-map";
import { Point } from "../util/primitives/point";
import { WaveTemplate } from "../wave/wave.template";

export class LevelTemplate {
  constructor(
    readonly map: GridMap,
    readonly basePoint: Point,
    readonly startPoint: Point,
    readonly waves: WaveTemplate[]
  ) {}
}