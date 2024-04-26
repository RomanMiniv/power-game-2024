import { Player } from "../../entities/Player/Player";
import { EventNames, SceneNames, StorageNames, TextureNames } from "../../shared/Names";
import { IPosition } from "../../shared/Types";
import { getRandomPositionAtZone } from "../../shared/Utils";
import { Level } from "../Level/Level";
import { IPopupData } from "../Popup/Popup";

export class EducationGame extends Level {
  player: Player;

  private _states = [this.setState_1, this.setState_2, this.setState_3, this.setState_4];
  private _currentState: number = 0;
  setNextState() {
    this._states[++this._currentState].bind(this)();
  }

  constructor() {
    super({
      key: SceneNames.EDUCATION_GAME,
      physics: {
        default: "arcade",
        arcade: {},
      },
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();

    this.setPlayer();

    this.setState_1();
  }

  setEvents(): void {
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
              this.scene.stop(this);
              this.scene.start(SceneNames.MENU);
            },
          }
        ]
      };
      this.scene.launch(SceneNames.POPUP, popupData);
    });

    const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enterKey.on("down", () => {
      this.completeStates(true);
    });
  }

  setPlayer(): void {
    const { width, height } = this.scale;

    this.player = new Player(this, width / 2, height / 2, TextureNames.RECT).setDepth(1);

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.button) {
        this.player.attack({ x: pointer.worldX, y: pointer.worldY });
      }
    });
  }

  setState_1(): void {
    const hint = this.showHint("Hello, let's study, I'll show you everything.\nPress Enter to skip.");
    this.time.delayedCall(4500, () => {
      hint.destroy();
      this.setNextState();
    });
  }

  setState_2(): void {
    const hint = this.showHint("First of all, let's learn to walk.\nTo do this, use the keys W A S D.");

    const lights = this.physics.add.staticGroup();

    const repeatStep: number = 3;
    let currentStep: number = 1;

    const { width, height } = this.scale;

    const doStep = () => {
      const r = 128;
      const pointLight = this.add.pointlight(Phaser.Math.Between(r, width - r), Phaser.Math.Between(r, height - r - hint.height), 0xffffff, r, .1);
      lights.add(pointLight);
    }
    doStep();

    this.physics.add.overlap(this.player, lights, (obj1, obj2) => {
      lights.remove(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody, true, true);
      if (currentStep++ >= repeatStep) {
        this.setNextState();
        hint.destroy();
      } else {
        doStep();
      }
    });
  }
  setState_3(): void {
    const hint = this.showHint("Perfectly!\nNow let's learn to shoot, for this use the left mouse button.");

    const boxes = this.physics.add.staticGroup();

    const repeatStep: number = 3;
    let currentStep: number = 1;

    const { width, height } = this.scale;

    const doStep = () => {
      const r = 128;
      const box = this.add.image(Phaser.Math.Between(r, width - r), Phaser.Math.Between(r, height - r), TextureNames.RECT)
        .setTintFill(0x00ff00);
      boxes.add(box);
    }
    doStep();

    this.physics.add.overlap(this.player.bulletManager, boxes, (obj1, obj2) => {
      this.player.bulletManager.destroyItem(obj1 as Phaser.Types.Physics.Arcade.GameObjectWithBody);
      boxes.remove(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody, true, true);
      if (currentStep++ >= repeatStep) {
        this.setNextState();
        hint.destroy();
      } else {
        doStep();
      }
    });
  }
  setState_4(): void {
    const hint = this.showHint("In addition to shooting, you can defend yourself.\nPress Space to create a power shield.\nThis shield will protect you from melee enemies.\nRemember about recharge.")

    const boxes = this.physics.add.group();

    const repeatStep: number = 3;
    let currentStep: number = 1;

    const getRandomPositionOutPlayerSafeZone = (): IPosition => {
      const { x: pX, y: pY, safeZoneOffset } = this.player;
      const worldBounds = this.physics.world.bounds;
      return getRandomPositionAtZone(
        { x1: pX - safeZoneOffset, y1: pY - safeZoneOffset, x2: pX + safeZoneOffset, y2: pY + safeZoneOffset },
        { x1: worldBounds.left, y1: worldBounds.top, x2: worldBounds.right, y2: worldBounds.bottom },
      );
    }

    const doStep = () => {
      const r = 128;
      const { x, y } = getRandomPositionOutPlayerSafeZone();
      const box = this.physics.add.image(x, y, TextureNames.RECT)
        .setTintFill(0x00ff00);
      boxes.add(box);
      box.setCollideWorldBounds(true).setVelocity(400).setBounce(1);
      this.physics.moveToObject(box, this.player);
    }
    doStep();

    this.physics.add.overlap(this.player.physicsStuff, boxes, (obj1, obj2) => {
      boxes.remove(obj2 as Phaser.Types.Physics.Arcade.GameObjectWithBody, true, true);
      if (currentStep++ >= repeatStep) {
        this.completeStates();
        hint.destroy();
      } else {
        doStep();
      }
    });
  }
  completeStates(skip: boolean = false): void {
    if (skip) {
      this.finish();
      return;
    }
    const hint = this.showHint("Congratulations, you have successfully completed your studies!\nI look forward to your new adventures.\nGood luck!");
    this.time.delayedCall(6000, () => {
      hint.destroy();
      this.finish();
    });
  }
  finish(): void {
    window.localStorage.setItem(StorageNames.IS_FIRST_RUN, String(true));
    this.scene.start(SceneNames.GAME);
    this.scene.remove(SceneNames.EDUCATION_GAME);
  }

  update(time: number, delta: number): void {
    this.player.update();
  }
}
