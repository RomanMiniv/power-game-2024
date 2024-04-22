
import { EntityManager } from "../../entities/Entity/EntityManager";
import { TextureNames } from "../../shared/Names";
import { IPosition } from "../../shared/Types";
import { Bullet } from "./Bullet";

export class BulletManager extends EntityManager {
  color: number;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(world, scene, children, config);
  }

  fire(from: IPosition, to: IPosition, velocity: number = 1200) {
    const bullet = new Bullet(this.scene, from.x, from.y, TextureNames.CIRCLE).setDisplaySize(15, 15);
    if (this.color) {
      bullet.setTint(this.color);
    }
    this.add(bullet);
    bullet.fire(to, velocity);
  }

  update() {
    (this.getChildren() as Bullet[]).forEach(bullet => {
      if (!this.scene.cameras.main.worldView.contains(bullet.x, bullet.y)) {
        this.destroyItem(bullet);
      }
    });
  }
}
