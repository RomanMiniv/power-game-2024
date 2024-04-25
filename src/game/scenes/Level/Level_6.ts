import { TextureNames } from "../../shared/Names";
import { Level, LevelPlayer } from "./Level";

export class Level_6 extends Level {
  private _isCompleted: boolean = false;
  private _player: LevelPlayer;
  private _startActionCompleted: boolean = false;

  constructor() {
    super({
      key: "Level_6",
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
    const hint = this.showHint("We can't do much alone");

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

    for (let i = 0; i < 4; i++) {
      const friend = this.add.image(Phaser.Math.Between(offset * 2, width - offset), Phaser.Math.Between(offset, height - offset), TextureNames.RECT)
        .setTintFill(0x00ff00)
        .setInteractive({ draggable: true, useHandCursor: true })
        .setBlendMode(Phaser.BlendModes.ADD)
        .on("drag", (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
          friend.x = dragX;
          friend.y = dragY;

          if (!this._startActionCompleted) {
            this._startActionCompleted = true;
            hint.destroy();
          }
          if (this.isCollisionBetweenObjects(friend, this._player)) {
            this._player.displayWidth += friend.width;
            friend.destroy();
          }
        });
    }
  }

  isCollisionBetweenObjects(gameObject1: Phaser.GameObjects.Image, gameObject2: Phaser.GameObjects.Image) {
    return (
      gameObject1.x + gameObject1.width >= gameObject2.x &&
      gameObject1.x <= gameObject2.x + gameObject2.width &&
      gameObject1.y + gameObject1.height >= gameObject2.y &&
      gameObject1.y <= gameObject2.y + gameObject2.height
    );
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

  resetState(): void {
    this._startActionCompleted = false;
  }

  setResult(): void {
    this._isCompleted = true;
    this.input.enabled = false;

    const text = "Well, united, you can play basketball...";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(4000, () => {
      this.showPower();
    });
  }
}
