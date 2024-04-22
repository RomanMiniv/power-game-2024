
import { BulletManager } from "../../../stuff/Bullet/BulletManager";
import { Enemy } from "../../Entity/Entity";
import { Player } from "../../Player/Player";

export class Ranger extends Enemy {
  bulletManager: BulletManager;
  timerEvent: Phaser.Time.TimerEvent | null;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
  }

  init(bulletManager: BulletManager): Ranger {
    this.bulletManager = bulletManager;
    this.move();
    return this;
  }

  update(): void {
    this.prepareAttack();
  }

  prepareAttack(): void {
    if (this.scene.cameras.main.worldView.contains(this.x, this.y)) {
      this.timerEvent ??= this.scene.time.addEvent({
        delay: Phaser.Math.Between(500, 2500),
        repeat: -1,
        callback: this.attack.bind(this)
      });
      this.timerEvent.paused = false;
    } else {
      if (this.timerEvent) {
        this.timerEvent.paused = true;
      }
    }
  }
  attack(): void {
    const { x, y } = (this.scene.data.get("player") as Player);
    this.bulletManager.fire({ x: this.x, y: this.y }, { x, y });
  }

  destroy(fromScene?: boolean | undefined): void {
    this.clear();
    super.destroy(fromScene);
  }
  clear(): void {
    if (this.timerEvent) {
      this.timerEvent.remove();
      this.timerEvent.destroy();
      this.timerEvent = null;
    }
    (this.bulletManager as unknown) = null;
  }
}
