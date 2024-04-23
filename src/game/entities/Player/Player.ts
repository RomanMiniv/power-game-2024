import { TextureNames } from "../../shared/Names";
import { IPosition } from "../../shared/Types";
import { BulletManager } from "../../stuff/Bullet/BulletManager";
import { Entity } from "../Entity/Entity";

interface IInputControl {
  up: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
}

export class Player extends Entity {
  private _inputControl: IInputControl;
  private _velocity: number = 400;
  safeZoneOffset: number = 100;

  bulletManager: BulletManager;

  physicsStuff: Phaser.Physics.Arcade.StaticGroup;
  private _shield: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.physicsStuff = scene.physics.add.staticGroup();

    this._inputControl = (this.scene.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    }) as IInputControl;

    this.initBulletManager();
  }
  initBulletManager() {
    this.bulletManager = new BulletManager(this.scene.physics.world, this.scene);
    this.bulletManager.color = 0xff0000;
  }

  update() {
    this.move();

    // attack
    this.bulletManager.update();

    // defence
    this.setShield();
  }

  move(): void {
    if (this._inputControl.up.isDown) {
      this.setVelocity(0, -this._velocity);
    }
    if (this._inputControl.right.isDown) {
      this.setVelocity(this._velocity, 0);
    }
    if (this._inputControl.down.isDown) {
      this.setVelocity(0, this._velocity);
    }
    if (this._inputControl.left.isDown) {
      this.setVelocity(-this._velocity, 0);
    }
    if (!this.isMovable()) {
      this.setVelocity(0);
    }
  }

  isMovable(): boolean {
    return this._inputControl.down.isDown || this._inputControl.right.isDown || this._inputControl.left.isDown || this._inputControl.up.isDown;
  }

  attack(to: IPosition): void {
    this.bulletManager.fire({ x: this.x, y: this.y }, to, 1500);
  }

  setShield(): void {
    if (this._inputControl.space.isDown) {
      if (!this._shield) {
        // todo: bind to timer recharge (cooldown)
        this._shield = this.scene.physics.add.image(this.x, this.y, TextureNames.RECT).setAlpha(.1).setDirectControl(true);
        this.physicsStuff.add(this._shield);

        this.scene.tweens.add({
          targets: this._shield,
          scale: 6,
          duration: 200,
          onComplete: () => {
            this.scene.tweens.add({
              targets: this._shield,
              alpha: .115,
              duration: 200,
              yoyo: true,
              repeat: 2,
              onComplete: () => {
                this.physicsStuff.remove(this._shield, true, true);
                this._shield = null;
              }
            });
          }
        });
      }
    }
  }
}
