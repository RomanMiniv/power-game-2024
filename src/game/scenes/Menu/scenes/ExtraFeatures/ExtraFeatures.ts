import { SceneNames } from "../../../../shared/Names";

export default class ExtraFeatures extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.EXTRA_FEATURES,
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escKey.on("down", () => {
      this.scene.start(SceneNames.MENU);
    });

    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, "ExtraFeatures");
  }

  update(time: number, delta: number): void {
  }
}
