import { SceneNames, StorageNames, TextureNames } from "../../shared/Names";
import { Player } from "../../entities/Player/Player";
import { ComputerAI } from "../../entities/ComputerAI/ComputerAI";
import { levelConfig } from "../Level/LevelConfig";
import { IPopupData } from "../Popup/Popup";

export default class Game extends Phaser.Scene {
  door: Phaser.GameObjects.Text;
  player: Player;
  computerAI: ComputerAI;

  constructor() {
    super({
      key: SceneNames.GAME,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escKey.on("down", () => {
      this.scene.pause();

      const popupData: IPopupData = {
        title: "Pause",
        menuConfig: [
          {
            label: "Continue",
            callback: () => {
              this.scene.resume();
            },
          },
          {
            label: "Quit Game",
            callback: () => {
              this.scene.stop("Game");
              this.scene.start(SceneNames.MENU);
            },
          }
        ]
      };
      this.scene.launch(SceneNames.POPUP, popupData);
    });

    // todo: refactor world dimensions
    const bg = this.add.image(0, 0, "prince").setOrigin(0).setAlpha(0);
    this.physics.world.setBounds(0, 0, bg.width, bg.height);
    this.cameras.main.setBounds(0, 0, bg.width, bg.height);

    // game stuff
    this.setDoor(bg);

    // entities
    this.setPlayer(bg);

    this.computerAI = new ComputerAI(this.physics.world, this);

    // collision
    this.setCollision();
  }
  setPlayer(bg: Phaser.GameObjects.Image): void {
    this.player = new Player(this, bg.width / 2, bg.height / 2, TextureNames.RECT);
    this.data.set("player", this.player);

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.button) {
        this.player.attack({ x: pointer.worldX, y: pointer.worldY });
      }
    });

    this.cameras.main.startFollow(this.player, true);
  }
  setCollision(): void {
    // todo: refactor

    // player vs melee
    this.physics.add.collider(this.computerAI.meleeManager, this.computerAI.meleeManager);

    this.physics.add.collider(this.player.physicsStuff, this.computerAI.meleeManager);  //
    this.physics.add.overlap(this.player.bulletManager, this.computerAI.meleeManager, (obj1, obj2) => { //
      this.player.bulletManager.destroyItem(obj1 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
      this.computerAI.meleeManager.destroyItem(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
    });
    this.physics.add.overlap(this.player, this.computerAI.meleeManager, (obj1, obj2) => {
      this.setDefeat();
    });

    // player vs kamikaze
    this.physics.add.collider(this.computerAI.kamikazeManager, this.computerAI.kamikazeManager);
    this.physics.add.collider(this.computerAI.kamikazeManager, this.computerAI.meleeManager);

    this.physics.add.collider(this.player.physicsStuff, this.computerAI.kamikazeManager);
    this.physics.add.overlap(this.player.bulletManager, this.computerAI.kamikazeManager, (obj1, obj2) => {
      this.player.bulletManager.destroyItem(obj1 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
      this.computerAI.kamikazeManager.destroyItem(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
    });
    this.physics.add.overlap(this.player, this.computerAI.kamikazeManager, (obj1, obj2) => {
      this.setDefeat();
    });

    // player vs ranger
    this.physics.add.collider(this.player.physicsStuff, this.computerAI.rangerManager);
    this.physics.add.overlap(this.player.bulletManager, this.computerAI.rangerManager, (obj1, obj2) => {
      this.player.bulletManager.destroyItem(obj1 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
      this.computerAI.rangerManager.destroyItem(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
    });
    this.physics.add.overlap(this.player, this.computerAI.rangerManager, (obj1, obj2) => {
      this.computerAI.rangerManager.destroyItem(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
    });
    this.physics.add.overlap(this.player, this.computerAI.rangerManager.bulletManager, (obj1, obj2) => {
      this.setDefeat();
    });
  }
  setDoor(bg: Phaser.GameObjects.Image): void {
    this.add.timeline([
      {
        at: 0,
        run: () => {
          this.door = this.add.text(Phaser.Math.Between(0, bg.width - 64), Phaser.Math.Between(0, bg.height - 64), "🚪", {
            fontSize: 64,
          }).setPadding(0, 10).setTint(0xff0000);
          this.physics.add.existing(this.door, true);
        }
      },
      {
        at: 5000,
        run: () => {
          this.door.clearTint();
          this.physics.add.collider(this.player, this.door, () => {
            this.setVictory();
          });
        },
      },
      {
        at: 10000,
        run: () => {
          this.door.destroy();
          this.door = null;
        },
        stop: true
      }
    ]).repeat().play();
  }

  setVictory(): void {
    const currentLevel = +window.localStorage.getItem(StorageNames.LEVEL);
    if (currentLevel === levelConfig.levels.length) {
      this.scene.start(SceneNames.MENU);
    } else {
      this.scene.start(SceneNames.LEVEL_MANAGER);
    }
  }
  setDefeat(): void {
    if (this.scene.isPaused(this)) {
      return;
    }
    this.scene.pause(this);

    const popupData: IPopupData = {
      title: "Game Over",
      menuConfig: [
        {
          label: "Retry",
          callback: () => {
            this.scene.start(SceneNames.GAME);
          },
        },
        {
          label: "Quit Game",
          callback: () => {
            this.scene.stop("Game");
            this.scene.start(SceneNames.MENU);
          },
        }
      ]
    };
    this.scene.launch(SceneNames.POPUP, popupData);
  }

  update(time: number, delta: number): void {
    this.player.update();
    this.computerAI.update();
  }
}
