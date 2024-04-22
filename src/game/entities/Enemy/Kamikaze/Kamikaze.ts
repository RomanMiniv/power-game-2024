
import { TextureNames } from "../../../shared/Names";
import { Melee } from "../Melee/Melee";

export class Kamikaze extends Melee {
  tween: Phaser.Tweens.Tween;

  init(): Melee {
    this.setCircle(this.width / 2);
    super.init();
    this.startExplosion();
    return this;
  }

  startExplosion(): void {
    this.tween = this.scene.tweens.add({
      targets: this,
      scale: 1.5,
      duration: 2000,
      onComplete: () => {
        if (!this.tween) {
          return;
        }
        this.clear();
        this.setVelocity(0).setImmovable(true).setPushable(false).setScale(3);
        const emitter = this.scene.add.particles(this.x, this.y, TextureNames.CIRCLE, {
          lifespan: 1000,
          speed: { min: 150, max: 250 },
          scale: { start: 0.8, end: 0 },
          emitting: false,
          quantity: 40,
        });
        emitter.on("complete", () => {
          this.destroy();
        });
        emitter.explode();
        this.scene.cameras.main.shake();
      }
    });
  }
  clearTween(): void {
    if (this.tween) {
      this.tween.destroy();
      this.tween = null;
    }
  }

  prepareAttack(): void {
    if (this.tween) {
      super.prepareAttack();
    }
    if (this.scene.cameras.main.worldView.contains(this.x, this.y)) {
      this.tween?.resume();
    } else {
      this.tween?.pause();
    }
  }

  clear(): void {
    super.clear();
    this.clearTween();
  }
}
