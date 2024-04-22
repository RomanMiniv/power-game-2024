export class EntityManager extends Phaser.Physics.Arcade.Group {
  destroyItem(item: Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
    this.remove(item, true, true);
  }
}
