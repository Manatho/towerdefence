export class Player {
  dead: boolean;
  health: number;
  resources: number;

  constructor(health: number) {
    this.health = health;
    this.resources = 20;
  }
}
