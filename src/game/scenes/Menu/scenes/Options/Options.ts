import Phaser from "phaser";

export default class Options extends Phaser.Scene {
  constructor() {
    super({
      key: "Options",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, "Options");
  }

  update(time: number, delta: number): void {
  }
}
