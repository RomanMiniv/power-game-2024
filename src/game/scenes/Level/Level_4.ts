import { Level } from "./Level";

export class Level_4 extends Level {
  constructor() {
    super({
      key: "Level_4",
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
