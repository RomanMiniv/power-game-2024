import { Player } from "../../entities/Player/Player";
import { TextureNames } from "../../shared/Names";
import { Level } from "./Level";

export class Level_3 extends Level {
  private readonly _idleTime: number = 10.02;  // secs
  private _currentTime: number = this._idleTime;
  private _timerView: Phaser.GameObjects.Text

  private _player: Player;
  private _spaceKey: Phaser.Input.Keyboard.Key;

  private _isCompleted: boolean = false;

  constructor() {
    super({
      key: "Level_3",
      physics: {
        default: "arcade",
        arcade: {},
      },
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();
    
    const { width, height } = this.scale;

    this._spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this._player = new Player(this, width / 2, height / 2, TextureNames.RECT);

    this._timerView = this.add.text(width / 2, height / 6, "", {
      fontSize: 64,
    }).setOrigin(.5);
  }

  update(time: number, delta: number): void {
    if (this._isCompleted) {
      return;
    }

    if (this._currentTime <= 0) {
      this.setResult();
    }

    if (!this._spaceKey.isDown) {   // block player unnecessary possibilities
      this._player.update();
    }
    if (this._player.isMovable()) {
      this.resetTime();
    }

    this.updateTimer(delta);
  }

  updateTimer(delta: number): void {
    this._currentTime -= delta / 1000;
    if (this._currentTime <= 0) {
      this._currentTime = 0;
    }
    this._timerView.setText(("0" + this._currentTime.toFixed(2)).slice(-5));
  }
  resetTime(): void {
    this._currentTime = this._idleTime;
  }

  setResult() {
    this._isCompleted = true;
    this.input.enabled = false;

    const text = "WTF! Are you serious?";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(3500, () => {
      this.showPower();
    });
  }
}
