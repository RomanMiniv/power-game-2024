import { TextureNames } from "../../shared/Names";
import { Level, LevelPlayer } from "./Level";

export class Level_8 extends Level {
  private _isCompleted: boolean = false;
  private _player: LevelPlayer;

  constructor() {
    super({
      key: "Level_8",
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
    this.physics.add.existing(finish, true);

    const bridge = this.physics.add.staticGroup();

    for (let i = 0; i < 3; i++) {
      const size: number = width / 3;

      const bridgePart = this.add.image(i * size, height / 2, TextureNames.RECT)
        .setDisplaySize(size, 50)
        .setTintFill(0x0000ff)
        .setOrigin(0);
      if (i === 1) {
        bridgePart.setAlpha(0);
      }

      bridge.add(bridgePart);
    }

    this.physics.add.collider(this._player, bridge);
    this.physics.add.collider(this._player, finish, () => {
      finish.setTint(0x00ff00);
      this.setResult();
    });
  }

  update(time: number, delta: number): void {
    if (this._isCompleted) {
      return;
    }

    this._player.update();
  }

  setResult(): void {
    this._isCompleted = true;
    this.input.enabled = false;

    const text = "Walker, there's no path, the path is made by walking.";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(5500, () => {
      this.showPower();
    });
  }
}
