import { Player } from "../../entities/Player/Player";
import { EventNames, SceneNames } from "../../shared/Names";
import { IPopupData } from "../Popup/Popup";
import { levelConfig } from "./LevelConfig";

import EasySpeech from "easy-speech";
EasySpeech.init();

export class LevelPlayer extends Player {
  setShield(): void {
  }
}

export class Level extends Phaser.Scene {
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
  }

  showHint(text: string): Phaser.GameObjects.Text {
    const { width, height } = this.scale;
    const hint = this.add.text(width / 2, height - height / 8, text, {
      fontSize: 24,
      color: "yellow",
      backgroundColor: "#111",
    }).setPadding(10).setOrigin(.5);
    return hint;
  }

  async playAudioSpeech(text: string) {
    // todo: add possibility on/off audio into Options scene
    return EasySpeech.speak({
      text,
      voice: EasySpeech.voices()[5],
    });
  }

  showPower(): void {
    const { width, height } = this.scale;

    const bg = this.add.graphics().fillStyle(0x141419).fillRect(0, 0, width, height).setAlpha(.9);

    const text = this.add.text(width / 2, height / 2, levelConfig.levels[this.getLevelSequenceNumber() - 1].powerName, {
      fontSize: 96,
    }).setOrigin(.5);

    const fx = text.postFX.addGlow(0xffffff, 2, 0, false, 0.1, 24);
    this.tweens.add({
      targets: fx,
      outerStrength: 3,
      yoyo: true,
      repeat: 1,
      ease: "sine.inout",
      onComplete: () => {
        this.scene.get(SceneNames.LEVEL_MANAGER).input.emit(EventNames.LEVEL_PASSED);
      }
    });
  }

  getLevelSequenceNumber(): number {
    return +this.scene.key.match(/\d+/)[0];
  }

  restart(): void {
    this.resetState();
    this.scene.restart();
  }
  resetState() {
  }
}
