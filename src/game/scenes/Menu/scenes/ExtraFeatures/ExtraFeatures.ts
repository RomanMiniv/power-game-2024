import { SceneNames, StorageNames } from "../../../../shared/Names";
import { levelConfig } from "../../../Level/LevelConfig";
import { ILevelManagerData } from "../../../Level/LevelManager";

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

    const titleFontSize: number = 64;
    const title = this.add.text(60, 40, "Powers", {
      color: "#e5e5e7",
      fontSize: titleFontSize,
    });

    const currentLevel = +window.localStorage.getItem(StorageNames.LEVEL);

    const menuContainer = this.add.container(width / 2, height / 2);
    levelConfig.levels.forEach((level, index) => {
      const isLevelUnlocked: boolean = currentLevel && currentLevel > index;
      const text: string = isLevelUnlocked ? level.powerName : "Locked power";
      const textElement = this.add.text(0, 0, text, {
        fontSize: 28,
        color: "#e5e5e7",
      })
        .setOrigin(.5);
      textElement.y += index * (textElement.height * 2);

      if (isLevelUnlocked) {
        textElement.setInteractive({
          useHandCursor: true,
        })
          .on("pointerover", () => {
            textElement.setTint(0xff0000);
          })
          .on("pointerout", () => {
            textElement.clearTint();
          })
          .on("pointerdown", () => {
            this.scene.start(SceneNames.LEVEL_MANAGER, { level: index + 1 } as ILevelManagerData);
          });
      }

      menuContainer.add(textElement);
    });
    menuContainer.y = title.y * 2;
  }

  update(time: number, delta: number): void {
  }
}
