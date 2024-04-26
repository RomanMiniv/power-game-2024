

import { TextureNames } from "../../../shared/Names";
import { IPosition } from "../../../shared/Types";
import { getRandomPositionAtZone } from "../../../shared/Utils";
import { EntityManager } from "../../Entity/EntityManager";
import { Player } from "../../Player/Player";
import { Melee } from "./Melee";

export class MeleeManager extends EntityManager {
  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(world, scene, children, config);
  }

  populate(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      const { x, y } = this.getRandomPositionOutPlayerSafeZone();
      const melee = new Melee(this.scene, x, y, TextureNames.TRAPEZIUM);
      this.add(melee);
      melee.init(); // todo: rewrite to builder?
    }
  }
  getRandomPositionOutPlayerSafeZone(): IPosition {
    const { x: pX, y: pY, safeZoneOffset } = (this.scene.data.get("player") as Player);
    const worldBounds = this.scene.physics.world.bounds;
    return getRandomPositionAtZone(
      { x1: pX - safeZoneOffset, y1: pY - safeZoneOffset, x2: pX + safeZoneOffset, y2: pY + safeZoneOffset },
      { x1: worldBounds.left, y1: worldBounds.top, x2: worldBounds.right, y2: worldBounds.bottom },
    );
  }

  update() {
    (this.getChildren() as Melee[]).forEach(melee => {
      melee.update();
    });
  }
}
