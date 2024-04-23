import { EventNames, SceneNames, StorageNames } from "../../shared/Names";
import { Level_1 } from "./Level_1";
import { Level_10 } from "./Level_10";
import { Level_11 } from "./Level_11";
import { Level_12 } from "./Level_12";
import { Level_13 } from "./Level_13";
import { Level_2 } from "./Level_2";
import { Level_3 } from "./Level_3";
import { Level_4 } from "./Level_4";
import { Level_5 } from "./Level_5";
import { Level_6 } from "./Level_6";
import { Level_7 } from "./Level_7";
import { Level_8 } from "./Level_8";
import { Level_9 } from "./Level_9";

export default class LevelManager extends Phaser.Scene {
  static LEVEL_AMOUNT: number = 13;

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
      Level_10,
      Level_11,
      Level_12,
      Level_13
    ];
    const nextLevel = +(window.localStorage.getItem(StorageNames.LEVEL) as unknown as number || 0) + 1;

    const levelSceneKey = `Level_${nextLevel}`;
    this.scene.add(levelSceneKey, levels[nextLevel - 1]);

    this.scene.get(levelSceneKey).input.on(EventNames.LEVEL_PASSED, () => {
      this.scene.remove(levelSceneKey);
      this.updateLevelState();
      this.scene.start(SceneNames.MENU);
    });

    this.scene.launch(levelSceneKey);
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

  update(time: number, delta: number): void {
  }
}
