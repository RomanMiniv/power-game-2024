import { EventNames, SceneNames, StorageNames } from "../../shared/Names";
import { IPopupData } from "../Popup/Popup";
import { Level_1 } from "./Level_1";
import { Level_2 } from "./Level_2";
import { Level_3 } from "./Level_3";
import { Level_4 } from "./Level_4";
import { Level_5 } from "./Level_5";
import { Level_6 } from "./Level_6";
import { Level_7 } from "./Level_7";
import { Level_8 } from "./Level_8";
import { Level_9 } from "./Level_9";

export interface ILevelManagerData {
  level: number;
}

export default class LevelManager extends Phaser.Scene {
  static LEVEL_AMOUNT: number = 9;

  constructor() {
    super({
      key: SceneNames.LEVEL_MANAGER,
    });
  }

  init(data: unknown) {
  }

  preload() {
    // todo: use load.sceneFile
  }

  create() {
    const levels = [
      Level_1,
      Level_2,
      Level_3,
      Level_4,
      Level_5,
      Level_6,
      Level_7,
      Level_8,
      Level_9,
    ];

    const levelManagerData = this.scene.settings.data as unknown as ILevelManagerData;

    const nextLevel = levelManagerData?.level ?? +(window.localStorage.getItem(StorageNames.LEVEL) as unknown as number || 0) + 1;

    const levelSceneKey = `Level_${nextLevel}`;
    const levelScene = levels[nextLevel - 1];
    this.scene.add(levelSceneKey, levelScene);

    this.setEvents(levelSceneKey);

    this.scene.launch(levelSceneKey);
  }
  setEvents(levelSceneKey: string): void {
    const levelManagerData = this.scene.settings.data as unknown as ILevelManagerData;

    this.input.on(EventNames.LEVEL_PASSED, (force: boolean) => {
      this.scene.remove(levelSceneKey);

      if (levelManagerData?.level) {
        this.scene.settings.data = null;
        this.scene.start(SceneNames.EXTRA_FEATURES);
        return;
      } else {
        if (force) {
          this.scene.start(SceneNames.MENU);
          return;
        }
        this.updateLevelState();
        this.showPopup();
      }
    });
  }
  updateLevelState(): void {
    let currentLevel = window.localStorage.getItem(StorageNames.LEVEL) as unknown as number;
    if (currentLevel) {
      currentLevel++;
    } else {
      currentLevel = 1;
    }
    window.localStorage.setItem(StorageNames.LEVEL, String(currentLevel));
  }

  showPopup() {
    const popupData: IPopupData = {
      title: "Level passed",
      menuConfig: [
        {
          label: "Continue",
          callback: () => {
            this.scene.start(SceneNames.GAME);
          },
        },
        {
          label: "Quit Game",
          callback: () => {
            this.scene.start(SceneNames.MENU);
          },
        }
      ]
    };
    this.scene.launch(SceneNames.POPUP, popupData);

  }

  update(time: number, delta: number): void {
  }
}
