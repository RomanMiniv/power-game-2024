import Phaser from "phaser";

export default class Credits extends Phaser.Scene {
  constructor() {
    super({
      key: "Credits",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, "Credits");
  }

  update(time: number, delta: number): void {
  }
}
