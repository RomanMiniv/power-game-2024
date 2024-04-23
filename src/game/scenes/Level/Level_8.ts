import { Level } from "./Level";

export class Level_8 extends Level {
  constructor() {
    super({
      key: "Level_8",
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
