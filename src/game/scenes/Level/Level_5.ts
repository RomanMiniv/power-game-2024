import { TextureNames } from "../../shared/Names";
import { Level, LevelPlayer } from "./Level";

export class Level_5 extends Level {
  private _isCompleted: boolean = false;
  private _player: LevelPlayer;

  constructor() {
    super({
      key: "Level_5",
      physics: {
        default: "arcade",
        arcade: {
          gravity: {
            x: 0,
            y: 100000,
          },
        },
      },
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const { width, height } = this.scale;
    this.physics.world.setBoundsCollision(true, true, false, false);

    const offset: number = 100;

    this._player = new LevelPlayer(this, offset, 0, TextureNames.RECT);

    const finish = this.add.text(width - offset, height / 2, "🏁", {
      fontSize: 64
    }).setOrigin(1);

    const bridge = this.physics.add.staticGroup();

    for (let i = 0; i < 2; i++) {
      const size: number = width / 2;

      const bridgePart = this.add.image(i * size, height / 2, TextureNames.RECT)
        .setDisplaySize(size - offset, 50)
        .setTintFill(0x0000ff)
        .setOrigin(0);
      if (i) {
        bridgePart.x += offset;
      }

      bridge.add(bridgePart);
    }

    this.physics.add.collider(this._player, bridge);
  }

  update(time: number, delta: number): void {
    if (this._isCompleted) {
      return;
    }

    this._player.update();
    if (this._player.getBottomCenter().y >= this.scale.height) {
      this.setResult();
    }
  }

  setResult(): void {
    this._isCompleted = true;
    this.input.enabled = false;

    const text = "F = mg";
    this.showHint(text).setFontSize(36);
    this.playAudioSpeech(text);

    this.time.delayedCall(2000, () => {
      this.showPower();
    });
  }
}
