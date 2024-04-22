import { SceneNames } from "../../shared/Names";
import menuConfigPath from "./menuConfig.json";

interface IMenuConfig {
  label: string;
  sceneKey?: string;
}

export default class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: SceneNames.MENU,
    });
  }

  init(data: unknown) {
  }

  preload() {
    this.load.json("menuConfig", menuConfigPath);
  }

  create() {
    this.createLogo()
    this.createMenu();
  }
  createLogo(): void {
    const logo = this.add.text(60, 40, "What power?", {
      fontSize: 64,
      stroke: "#ff0000",
    });
  }
  createMenu(): void {
    const menuConfig: IMenuConfig[] = this.cache.json.get("menuConfig");

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
        .on("pointerover", (event: unknown) => {
          text.setTint(0xff0000);
        })
        .on("pointerout", (event: unknown) => {
          text.clearTint();
        })
        .on("pointerdown", (event: unknown) => {
          this.scene.start(menuItem.sceneKey);

        });

      menuContainer.add(text);
    });
    menuContainer.y -= (menuContainer.list[menuContainer.list.length - 1] as Phaser.GameObjects.Text).y / 2;
  }

  update(time: number, delta: number): void {
  }
}
