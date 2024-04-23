import { SceneNames, StorageNames } from "../../shared/Names";
import { levelConfig } from "../Level/LevelConfig";
import { menuConfig } from "./menuConfig";

export default class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.MENU,
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    this.createLogo()
    this.createMenu();
  }
  createLogo(): void {
    const logo = this.add.text(60, 40, "What power?", {
      fontSize: 64,
    });
  }
  createMenu(): void {
    const { width, height } = this.scale;
    const menuContainer = this.add.container(width / 2, height / 2);
    menuConfig.forEach((menuItem, index) => {
      const text = this.add.text(0, 0, menuItem.label, {
        fontSize: 36,
      })
        .setOrigin(.5);
      text.y += index * (text.height * 2);

      text.setInteractive({
        useHandCursor: true,
      })
        .on("pointerover", () => {
          text.setTint(0xff0000);
        })
        .on("pointerout", () => {
          text.clearTint();
        })
        .on("pointerdown", () => {
          if (menuItem.label.includes("Start")) { // todo: refactor
            window.localStorage.removeItem(StorageNames.LEVEL);
          }
          this.scene.start(menuItem.sceneKey);
        });

      menuContainer.add(text);

      if (menuItem.label.includes("Continue")) {  // todo: refactor
        const level = window.localStorage.getItem(StorageNames.LEVEL);
        if (!level) {
          text.disableInteractive();
          text.setAlpha(.5);
        } else {
          const percentagePassedGame: number = Math.round((+level / levelConfig.levels.length) * 100);
          text.setText(text.text.replace(/\d/, `${percentagePassedGame}`));
        }
      }
    });
    menuContainer.y -= (menuContainer.list[menuContainer.list.length - 1] as Phaser.GameObjects.Text).y / 2;
  }

  update(time: number, delta: number): void {
  }
}
