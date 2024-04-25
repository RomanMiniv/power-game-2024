import { TextureNames } from "../../shared/Names";
import { Level, LevelPlayer } from "./Level";

export class Level_7 extends Level {
  private _isCompleted: boolean = false;
  private _player: LevelPlayer;

  constructor() {
    super({
      key: "Level_7",
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
    this.physics.add.collider(this._player, finish, () => {
      finish.setTint(0x00ff00);
      this.setResult();
    });

    const bridgePart = this.physics.add.image(width - 100, Phaser.Math.Between(this._player.height, height / 2 - this._player.height), TextureNames.RECT)
      .setDisplaySize(this._player.width * 4 - 10, this._player.height)
      .setTintFill(0xa020f0)
      .setOrigin(1);
    bridgePart.body.setAllowGravity(false);

    this.physics.add.collider(bridgePart, bridge);
    this.physics.add.collider(bridgePart, this._player);

    const magnet = this.add.text(Phaser.Math.Between(offset * 2, width - offset), Phaser.Math.Between(offset, height - offset), "🧲", {
      fontSize: 64,
    })
      .setPadding(10)
      .setScale(-1, 1)
      .setInteractive({ draggable: true, useHandCursor: true })
      .setBlendMode(Phaser.BlendModes.ADD)
      .on("dragstart", () => {
        bridgePart.setImmovable(false);
      })
      .on("drag", (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
        magnet.x = dragX;
        magnet.y = dragY;

        this.physics.moveToObject(bridgePart, magnet);
      })
      .on("dragend", () => {
        bridgePart.setVelocity(0);
        bridgePart.setImmovable(true);
      });
  }

  update(time: number, delta: number): void {
    if (this._isCompleted) {
      return;
    }

    this._player.update();
    if (this._player.getBottomCenter().y >= this.scale.height) {
      this.restart();
    }
  }

  setResult(): void {
    this._isCompleted = true;
    this.input.enabled = false;

    const text = "Gravity, magnet, are we in physics class?";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(4500, () => {
      this.showPower();
    });
  }
}
