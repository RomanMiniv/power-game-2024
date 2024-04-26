import { Level } from "./Level";

export class Level_9 extends Level {
  private _userIcons: string[] = ["😐", "🙂", "🤠", "😁"];
  private _messages: string[] = [
    "",
    "You have a beautiful smile",
    "Nice hat",
    "You are funny",
  ]
  private _userIconIndex: number = 0;

  constructor() {
    super({
      key: "Level_9",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();
    
    const { width, height } = this.scale;

    const userIcon = this.add.text(width / 2, height / 3, this._userIcons[this._userIconIndex], {
      fontSize: 96,
    }).setPadding(10).setOrigin(.5);

    const message = this.add.text(width / 2, height / 2, this._messages[this._userIconIndex], {
      fontSize: 48,
    }).setOrigin(.5);

    this.input.on("pointerdown", () => {
      this._userIconIndex++;

      if (this._userIconIndex === this._userIcons.length) {
        this.setResult();
        return;
      }

      userIcon.setText(this._userIcons[this._userIconIndex]);
      message.setText(this._messages[this._userIconIndex]);
    });
  }

  setResult() {
    this.input.enabled = false;

    const text = "Think what you say!";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(2500, () => {
      this.showPower();
    });
  }

  update(time: number, delta: number): void {
  }
}
