import { Scene } from "phaser";
import { SceneNames } from "../../../../shared/Names";

export default class Credits extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.CREDITS,
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