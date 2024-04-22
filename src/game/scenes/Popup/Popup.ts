import { SceneNames } from "../../shared/Names";

export default class Popup extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.POPUP,
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    const bg = this.add.graphics().fillStyle(0x141419).fillRect(0, 0, width / 2, height / 2)
    bg.setPosition(width / 2 - (width / 2) / 2, height / 2 - (height / 2) / 2).setAlpha(.95);

    const title = this.add.text(width / 2, bg.y, "Game Over", {
      color: "#e5e5e7",
      fontSize: 48,
    }).setOrigin(.5);
    title.y += title.height * 1.5;

    const menuContainer = this.add.container(width / 2, height / 2);
    const menuConfig = [{
      label: "Retry",
      sceneKey: SceneNames.GAME,
    }, {
      label: "Quit Game",
      sceneKey: SceneNames.MENU,
    }]
    menuConfig.forEach((menuItem, index) => {
      const text = this.add.text(0, 0, menuItem.label, {
        fontSize: 36,
        color: "#e5e5e7",
      })
        .setOrigin(.5);
      text.y += index * (text.height * 2);

      text.setInteractive({
        useHandCursor: true,
      })
        .on("pointerover", (event: unknown) => {
          text.setTint(0xff0000);
        })
        .on("pointerout", (event: unknown) => {
          text.clearTint();
        })
        .on("pointerdown", (event: unknown) => {
          if (menuItem.sceneKey === SceneNames.MENU) {
            this.scene.stop("Game");
          }
          this.scene.start(menuItem.sceneKey);
        });

      menuContainer.add(text);
    });
  }

  update(time: number, delta: number): void {
  }
}
