import { Level } from "./Level";

export class Level_10 extends Level {
  constructor() {
    super({
      key: "Level_10",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();
    
    const { width, height } = this.scale;
    this.showPower();
  }

  update(time: number, delta: number): void {
  }
}
