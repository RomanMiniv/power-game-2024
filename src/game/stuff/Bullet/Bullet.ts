import { IPosition } from "../../shared/Types";

export class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
  }

  fire(to: IPosition, velocity: number): void {
    this.scene.physics.moveTo(this, to.x, to.y, velocity);
  }
}
