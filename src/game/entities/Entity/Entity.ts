export class Entity extends Phaser.Physics.Arcade.Image {
}

export class Enemy extends Entity {
  move(): void {
    this.setCollideWorldBounds().setVelocity(this.getRandomVelocity(), this.getRandomVelocity()).setBounce(1);
  }
  getRandomVelocity(): number {
    const direction: number = Phaser.Utils.Array.GetRandom([-1, 1]);
    return direction * Phaser.Math.Between(50, 150);
  }
}
