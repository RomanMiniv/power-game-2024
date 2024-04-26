import { SceneNames } from "../../shared/Names";
import { Level } from "../Level/Level";
import { IPopupData } from "../Popup/Popup";


export class LoreOutro extends Level {
  private _antagonist: Phaser.GameObjects.Text;
  private _texts: string[] = [
    "So you traveled, you fought, but did you find the answer to my question?",
    "What is the power?",
    "What, you have nothing to say?",
    "Well, your adventures amused me, so I'll let you try again.",
    "I will ask you another question...",
    "And my next question...",
    "Part 2 - coming soon!",
  ];
  private _currentText: number = 0;

  constructor() {
    super({
      key: SceneNames.LORE_OUTRO,
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    super.create();

    const { width, height } = this.scale;

    const hint = this.showHint("Press {Enter} to skip");
    hint.setPosition(width / 2, height - hint.height).setTint(0xff0000);


    const fontSize: number = 132;
    this._antagonist = this.add.text(width / 2, -fontSize, "🧙", {
      fontSize,
    }).setPadding(fontSize / 4).setOrigin(.5);

    this.tweens.add({
      targets: this._antagonist,
      y: fontSize,
      duration: 1500,
      ease: "Bounce",
      onComplete: async () => {
        await this.showDialog();
        this.completeStates();
      }
    })
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
            label: "Skip",
            callback: () => {
              this.completeStates(true);
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

  async showDialog() {
    this.showText();
    for (let i = this._currentText; i < this._texts.length; i++) {
      await new Promise<void>((resolve) => {
        this.time.delayedCall(2000, () => {
          this.showText();
          resolve();
        });
      });
    }
  }

  showText() {
    const text: string = this._texts[this._currentText];
    const hint = this.showHint(text);
    const offset: number = 60;
    hint.y = this._antagonist.getBounds().bottom + this._currentText * offset;
    this._currentText++;
  }

  completeStates(skip: boolean = false): void {
    if (skip) {
      this.finish();
      return;
    }

    this.time.delayedCall(30000, () => {
      this.finish();
    });
  }
  finish(): void {
    this.scene.start(SceneNames.MENU);
    this.scene.remove(this);
  }

  update(time: number, delta: number): void {
  }
}
