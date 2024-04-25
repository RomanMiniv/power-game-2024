import { SceneNames } from "../../shared/Names";

export interface IPopupData {
  title: string;
  subTitle?: string;
  menuConfig: ImenuItem[];
}

interface ImenuItem {
  label: string;
  callback: () => void;
}

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
    this.scene.bringToTop();

    const popupData = this.scene.settings.data as unknown as IPopupData;

    const { width, height } = this.scale;
    const bg = this.add.graphics().fillStyle(0x141419).fillRect(0, 0, width / 2, height / 2)
    bg.setPosition(width / 2 - (width / 2) / 2, height / 2 - (height / 2) / 2).setAlpha(.95);

    const title = this.add.text(width / 2, bg.y, popupData.title, {
      color: "#e5e5e7",
      fontSize: 48,
    }).setOrigin(.5);
    title.y += title.height * 1.5;
    const subtitle = this.add.text(title.x, title.y, popupData.subTitle, {
      color: "#ffff00",
      fontSize: 24,
    }).setOrigin(.5).setAlpha(.8);
    subtitle.y += subtitle.height * 2;

    const menuContainer = this.add.container(width / 2, height / 2);
    popupData.menuConfig.forEach((menuItem, index) => {
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
          menuItem.callback();
          this.scene.stop(this);
        });

      menuContainer.add(text);
    });
  }

  update(time: number, delta: number): void {
  }
}
