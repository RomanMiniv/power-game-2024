import { getRandomPositionAtZone } from "../../shared/Utils";
import { Level } from "./Level";

export class Level_1 extends Level {
  private _messageContainer: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: "Level_1",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;

    const hint = this.showHint("Click to play the next step");

    const icons = ["🗣️", "👤"];

    const iconContainer = this.add.container(width / 2, height / 3);
    icons.forEach((text, index) => {
      const textElement = this.add.text(0, 0, text, {
        fontSize: 96,
      }).setPadding(10);
      textElement.x += index * textElement.width;
      iconContainer.add(textElement);
    });
    iconContainer.x -= (iconContainer.list[0] as Phaser.GameObjects.Text).width * iconContainer.list.length / 2;
    iconContainer.y -= (iconContainer.list[0] as Phaser.GameObjects.Text).height / 2;

    let messageIndex: number = 0;
    const messages = [
      [
        "Can you...?",
        "Well, please",
        "Maybe we can come to an agreement?",
        "And if so?",
        "Are you sure?",
        "Think well",
        "Can I?,",
        "...",
        "...",
        "...",
        "...",
      ],
      [
        "Never!",
        "In no case",
        "F@#k you!",
        "No",
        "I don't know",
        "Do you think you can buy me?",
        "What to do?",
        "I am listening",
        "I listen carefully!",
        "Give orders, sir",
        "My life is your life!",
      ]
    ];

    const showMessages = (messages: string[]) => {
      this._messageContainer?.destroy();
      this._messageContainer = this.add.container(width / 2, height / 2);
      messages.forEach((text, index) => {
        const textElement = this.add.text(0, 0, `${icons[index]} ${text}`, {
          fontSize: 24,
          align: "center",
        }).setPadding(10);
        textElement.y += index * textElement.height;
        this._messageContainer.add(textElement);
      });
      this._messageContainer.x -= (this._messageContainer.list[0] as Phaser.GameObjects.Text).width / 2;
      this._messageContainer.y -= (this._messageContainer.list[0] as Phaser.GameObjects.Text).height / 2;
    }
    const giveMoney = () => {
      const moneySize = 64;
      const offset = 150;
      const { x, y } = getRandomPositionAtZone(
        {
          x1: iconContainer.getBounds().left - offset,
          y1: iconContainer.getBounds().top - offset,
          x2: iconContainer.getBounds().right + offset,
          y2: iconContainer.getBounds().bottom + offset,
        },
        {
          x1: moneySize,
          y1: moneySize,
          x2: width - moneySize,
          y2: height - moneySize,
        },
      );
      this.add.text(x, y, "💰", {
        fontSize: moneySize,
      }).setPadding(10);
    }

    this.input.on("pointerdown", () => {
      if (!messageIndex) {
        hint.destroy();
      }

      if (messageIndex === messages[0].length) {
        this.input.enabled = false;

        const text = "Happiness is not in money";
        this.showHint(text);
        this.playAudioSpeech(text);

        this.time.delayedCall(3000, () => {
          this.showPower();
        });
        return;
      }

      showMessages([messages[0][messageIndex], messages[1][messageIndex]]);

      if (messageIndex > 1) {
        for (let i = 2; i <= messageIndex; i++) {
          giveMoney();
        }
      }

      messageIndex++;
    });
  }

  update(time: number, delta: number): void {
  }
}
