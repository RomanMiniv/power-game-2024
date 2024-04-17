import Phaser from "phaser";

export default class ExtraFeatures extends Phaser.Scene {
  constructor() {
    super({
      key: "ExtraFeatures",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, "ExtraFeatures");
  }

  update(time: number, delta: number): void {
  }
}
