
import { TextureNames } from "../../../shared/Names";
import { BulletManager } from "../../../stuff/Bullet/BulletManager";
import { MeleeManager } from "../Melee/MeleeManager";
import { Ranger } from "./Ranger";

export class RangerManager extends MeleeManager {
  bulletManager: BulletManager;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(world, scene, children, config);
    this.initBulletManager();
  }

  initBulletManager(): void {
    this.bulletManager = new BulletManager(this.scene.physics.world, this.scene);
    this.bulletManager.color = 0x00ff00;
  }

  populate(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      const { x, y } = this.getRandomPositionOutPlayerSafeZone();
      const ranger = new Ranger(this.scene, x, y, TextureNames.TRIANGLE);
      this.add(ranger);
      ranger.init(this.bulletManager);
    }
  }


  update() {
    super.update();
    this.bulletManager.update();
  }
}
