import { Level } from "./Level";

enum EIcons {
  GUN = "🔫",
  SHOT = "💥",
}

export class Level_4 extends Level {
  private _userIcons: string[] = ["🙃", "😮", "😯", "😲", "😳", "🤠"];
  private _shotIndex: number = 0;
  private readonly _shotsAmount: number = 5;
  private _shotSet: Phaser.GameObjects.Container;
  private _iconsView: Phaser.GameObjects.Container;

  constructor() {
    super({
      key: "Level_4",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();
    
    const hint = this.showHint("Good luck, cowboy!");

    this.setIcons();
    this.setShots();

    this.input.on("pointerdown", () => {
      if (!this._shotIndex) {
        hint.destroy();
      }

      (this._shotSet.list[this._shotIndex] as Phaser.GameObjects.Text).setAlpha(.5);
      this._shotIndex++;
      (this._iconsView.list[0] as Phaser.GameObjects.Text).setText(this._userIcons[this._shotIndex]);

      if (this._shotIndex === this._shotsAmount) {
        this.input.enabled = false;

        const text = "Yee-Haaw!";
        this.showHint(text);
        this.playAudioSpeech(text);

        this.time.delayedCall(2000, () => {
          this.showPower();
        });
      }
    });
  }

  setIcons(): void {
    const { width, height } = this.scale;

    const icons = [this._userIcons[0], EIcons.GUN];

    this._iconsView = this.add.container(width / 2, height / 3);
    icons.forEach((text, index) => {
      const textElement = this.add.text(0, 0, text, {
        fontSize: 96,
      }).setPadding(10).setOrigin(.5);
      textElement.x += index * textElement.width;
      this._iconsView.add(textElement);
    });
    this._iconsView.x -= (this._iconsView.list[0] as Phaser.GameObjects.Text).width / 2;
    this._iconsView.y -= (this._iconsView.list[0] as Phaser.GameObjects.Text).height / 2;
  }

  setShots(): void {
    const { width, height } = this.scale;

    this._shotSet = this.add.container(width / 2, height / 2);
    for (let i = 0; i < this._shotsAmount; i++) {
      const textElement = this.add.text(0, 0, EIcons.SHOT, {
        fontSize: 48,
      }).setPadding(10).setOrigin(.5);
      textElement.x += i * textElement.width;
      this._shotSet.add(textElement);
    }
    this._shotSet.x -= ((this._shotSet.list[0] as Phaser.GameObjects.Text).width * this._shotSet.list.length) / 2 - (this._shotSet.list[0] as Phaser.GameObjects.Text).width / 2;
    this._shotSet.y += (this._shotSet.list[0] as Phaser.GameObjects.Text).height / 2;
  }

  update(time: number, delta: number): void {
  }
}
