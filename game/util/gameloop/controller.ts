export interface Game {
  update(): void;
  controller: GameLoopController;
}

export type GameLoopHook = (controller: GameLoopController) => void;
export class GameLoopController {
  frame: number;
  targetFrameTime: number;
  isRunning: boolean;
  game: Game;
  instance: number;

  time: number;
  delta: number;
  deltaMultiplier: number;

  timeOffset: number;
  pauseStart: number;

  private tickQueued: boolean;
  private preUpdate: GameLoopHook;
  private postUpdate: GameLoopHook;

  constructor(game: Game, instance: number) {
    this.instance = instance;
    this.isRunning = true;
    this.frame = 0;

    this.time = this.now();
    this.delta = 0;
    this.deltaMultiplier = 1;
    this.timeOffset = 0;
    this.pauseStart = 0;

    this.targetFrameTime = 1000;

    this.game = game;
    this.game.controller = this;
  }

  next() {
    this.game.update();
    this.frame++;
  }

  startLoop(preUpdate: GameLoopHook, postUpdate: GameLoopHook) {
    this.time = this.now() - this.timeOffset;
    this.preUpdate = preUpdate;
    this.postUpdate = postUpdate;
    this.loop(preUpdate, postUpdate);
  }

  stop() {
    this.isRunning = false;
  }

  togglePause() {
    if (this.isRunning) {
      this.pauseStart = this.now();
      this.isRunning = false;
    } else {
      this.timeOffset += this.now() - this.pauseStart;
      this.isRunning = true;
      if (!this.tickQueued) {
        this.loop(this.preUpdate, this.postUpdate);
      }
    }
  }

  loop(preUpdate: GameLoopHook, postUpdate: GameLoopHook) {
    this.tickQueued = false;
    if (this.isRunning) {
      this.delta = (this.now() - this.time) * this.deltaMultiplier;
      this.time = this.now();

      preUpdate(this);
      this.next();
      postUpdate(this);

      if (this.delta / this.targetFrameTime > 1.2) {
        // console.log('slow', this.delta)
      }

      this.tickQueued = true;
      setTimeout(() => {
        this.loop(preUpdate, postUpdate);
      }, this.targetFrameTime * 1000);
    }
  }

  private now() {
    return Date.now() / 1000 - this.timeOffset;
  }
}
