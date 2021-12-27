import { Graphics } from "../graphics";

export interface Game {
  update(): void;
  render(graphics: Graphics): void;
  controller: GameLoopController;
}

export type GameLoopHook = (controller: GameLoopController) => void;
export class GameLoopController {
  frame: number;
  speed: number;
  isRunning: boolean;
  game: Game;
  instance: number;

  time: number;
  delta: number;

  constructor(game: Game, instance: number) {
    this.instance = instance;
    this.isRunning = true;
    this.frame = 0;
    this.time = new Date().getTime();
    this.delta = 0;
    this.speed = 1000;

    this.game = game;
    this.game.controller = this;
  }

  next() {
    this.game.update();
    this.frame++;
  }

  startLoop(preUpdate: GameLoopHook, postUpdate: GameLoopHook) {
    this.time = Date.now() / 1000;
    this.loop(preUpdate, postUpdate);
  }

  loop(preUpdate: GameLoopHook, postUpdate: GameLoopHook) {
    if (this.isRunning) {
      preUpdate(this);
      this.next();
      postUpdate(this);

      this.delta = Date.now() / 1000 - this.time;
      this.time = Date.now() / 1000;

      if(this.delta / this.speed > 1.2) {
       // console.log('slow', this.delta)
      }

      setTimeout(() => {
        this.loop(preUpdate, postUpdate);
      }, this.speed*1000);
    }
  }
}
