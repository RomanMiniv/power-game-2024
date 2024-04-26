import { SceneNames } from "../../../../shared/Names";

interface IKeyboardConfig {
  title: string;
  keys: IKeyConfig[];
}
interface IKeyConfig {
  key: string;
  label: string;
}

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
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escKey.on("down", () => {
      this.scene.start(SceneNames.MENU);
    });

    const titleFontSize: number = 64;
    const title = this.add.text(60, 40, "Options", {
      fontSize: titleFontSize,
    });

    const playerKeyboardConfig: IKeyboardConfig = {
      title: "Player settings",
      keys: [
        {
          key: "W",
          label: "Move up",
        },
        {
          key: "A",
          label: "Move left",
        },
        {
          key: "S",
          label: "Move right",
        },
        {
          key: "D",
          label: "Move down",
        },
        {
          key: "Left mouse button (LMB)",
          label: "Attack",
        },
        {
          key: "Space",
          label: "Defence",
        },
      ]
    };

    const gameKeyboardConfig: IKeyboardConfig = {
      title: "Game settings",
      keys: [
        {
          key: "Enter",
          label: "Skip",
        },
        {
          key: "ESC",
          label: "Pause / Back",
        },
      ]
    };

    const playerKeyboardContainer = this.setKeyboardConfig(playerKeyboardConfig);
    const gameKeyboardContainer = this.setKeyboardConfig(gameKeyboardConfig);

    const { width, height } = this.scale;

    playerKeyboardContainer.x -= width / 5;
    gameKeyboardContainer.x += width / 5;
  }

  setKeyboardConfig(keyboardConfig: IKeyboardConfig) {
    const { width, height } = this.scale;

    const container = this.add.container();

    const fontSize = 36;
    const playerTitle = this.add.text(width / 2, fontSize, keyboardConfig.title, {
      color: "yellow",
      fontSize,
    }).setOrigin(.5);
    playerTitle.y += playerTitle.height * 3;

    const menuContainer = this.add.container(width / 2, height / 2);
    keyboardConfig.keys.forEach((key, index) => {
      const textElement = this.add.text(0, 0, `${key.label}\n{${key.key}}`, {
        fontSize: 28,
        align: "center",
      })
        .setOrigin(.5);
      textElement.y += index * (textElement.height * 1.5);

      menuContainer.add(textElement);
    });
    menuContainer.y = playerTitle.y + (menuContainer.list[0] as Phaser.GameObjects.Text).height * 1.5;

    container.add([playerTitle, menuContainer]);

    return container;
  }

  update(time: number, delta: number): void {
  }
}
