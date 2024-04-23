import { Level } from "./Level";

export class Level_5 extends Level {
  constructor() {
    super({
      key: "Level_5",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    this.showPower();
  }

  update(time: number, delta: number): void {
  }
}
