import { SceneNames } from "../../../../shared/Names";

interface IItems {
  title: string;
  who: string;
}

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
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escKey.on("down", () => {
      this.scene.start(SceneNames.MENU);
    });

    const titleFontSize: number = 64;
    const title = this.add.text(60, 40, "Credits", {
      fontSize: titleFontSize,
    });

    const config: IItems[] = [
      {
        title: "Idea Creator",
        who: "unique chars"
      },
      {
        title: "Game Designer",
        who: "unique chars"
      },
      {
        title: "Level Designer",
        who: "unique chars"
      },
      {
        title: "Software Engineer",
        who: "unique chars"
      },
      {
        title: "Graphic Designer",
        who: "unique chars"
      },
      {
        title: "Content Creator",
        who: "unique chars"
      },
    ];

    const conteiner = this.setText(config);
    this.tweens.add({
      targets: conteiner,
      y: -this.scale.height,
      duration: config.length * 2000,
      onComplete: () => {
        const fontSize: number = 48;
        this.add.text(this.scale.width / 2, this.scale.height / 2, "Thanks for playing the game!\nHope you had fun :).\nGood luck!", {
          fontSize,
          lineSpacing: fontSize,
          color: "yellow",
          align: "center",
        }).setOrigin(.5);
        this.time.delayedCall(4000, () => {
          this.scene.start(SceneNames.MENU);
        })
      }
    });

  }

  setText(config: IItems[]) {
    const { width, height } = this.scale;
    const menuContainer = this.add.container(width / 2, height / 2);
    config.forEach((item, index) => {
      const textElement = this.add.text(0, 0, `${item.title}\n${item.who}`, {
        fontSize: 36,
        align: "center",
      })
        .setOrigin(.5).setTintFill(0xffff00, 0xffff00, 0xffffff, 0xffffff);
      textElement.y += index * (textElement.height * 2);

      menuContainer.add(textElement);
    });
    menuContainer.y = height + (menuContainer.list[0] as Phaser.GameObjects.Text).height;

    return menuContainer;
  }

  update(time: number, delta: number): void {
  }
}
