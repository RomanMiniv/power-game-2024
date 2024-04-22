import { SceneNames } from "../../../../shared/Names";

export default class Options extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.OPTIONS,
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
