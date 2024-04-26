import { StorageNames } from "../../shared/Names";
import { KamikazeManager } from "../Enemy/Kamikaze/KamikazeManager";
import { MeleeManager } from "../Enemy/Melee/MeleeManager";
import { RangerManager } from "../Enemy/Ranger/RangerManager";

export class ComputerAI extends Phaser.Physics.Arcade.Group {
  // todo: refactor to some structure (collection)
  meleeManager: MeleeManager;
  kamikazeManager: KamikazeManager;
  rangerManager: RangerManager;

  constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[] | Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig, config?: Phaser.Types.Physics.Arcade.PhysicsGroupConfig | Phaser.Types.GameObjects.Group.GroupCreateConfig) {
    super(world, scene, children, config);

    this.meleeManager = new MeleeManager(this.scene.physics.world, this.scene);
    this.kamikazeManager = new KamikazeManager(this.scene.physics.world, this.scene);
    this.rangerManager = new RangerManager(this.scene.physics.world, this.scene);

    this.setBehaviour();
  }
  setBehaviour(): void {
    // todo: bind new wave time and amount to level?
    this.generateWave();
    this.scene.time.addEvent({
      delay: 10000,
      repeat: -1,
      callback: this.generateWave.bind(this),
    });
  }
  generateWave(): void {
    // todo: bind to timer or add text like "new wave"

    const currentLevel = +window.localStorage.getItem(StorageNames.LEVEL);

    const adtEnemies: number = Math.round(currentLevel / 2);
    const adtRengers: number = Math.round(adtEnemies / 2)
    this.meleeManager.populate(Phaser.Math.Between(3 + adtEnemies / 2, 5 + adtEnemies));
    this.kamikazeManager.populate(Phaser.Math.Between(1 + adtEnemies, 3 + adtEnemies));
    this.rangerManager.populate(Phaser.Math.Between(1 + adtRengers, 3 + adtRengers));
  }

  update(): void {
    this.meleeManager.update();
    this.kamikazeManager.update();
    this.rangerManager.update();
  }
}
