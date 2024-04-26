import { SceneNames, TextureNames } from "../../shared/Names";

export default class Boot extends Phaser.Scene {
  private _loaderProgressBar: Phaser.GameObjects.Graphics;
  private _progressPercentageText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SceneNames.BOOT,
    });
  }

  init(data: unknown) {
  }

  preload() {
    const loaderBoxSize = this.drawBootloader();

    this.load.on("progress", (amount: number) => {
      this._loaderProgressBar.fillRect(loaderBoxSize.x + 10, loaderBoxSize.y + 10, (loaderBoxSize.width - 20) * amount, loaderBoxSize.heigth - 20);
      this._progressPercentageText.setText(parseInt((String(amount * 100))) + "%");
    });
    this.load.on("complete", () => {
      this.scene.start(SceneNames.MENU);
    });

    this.generateTextures();

    // here load all assets
  }

  drawBootloader() {
    const { width: cWidth, height: cHeight } = this.game.canvas;
    const loaderBoxSize = {
      x: cWidth / 2,
      y: cHeight / 2,
      width: cWidth / 2,
      heigth: cHeight / 12,
    };
    loaderBoxSize.x = loaderBoxSize.x - loaderBoxSize.width / 2;
    loaderBoxSize.y = loaderBoxSize.y - loaderBoxSize.heigth / 2;

    const loaderBox = this.add.graphics({
      fillStyle: {
        color: Phaser.Display.Color.HexStringToColor("#222").color,
      },
    });
    loaderBox.fillRect(loaderBoxSize.x, loaderBoxSize.y, loaderBoxSize.width, loaderBoxSize.heigth);

    this._loaderProgressBar = this.add.graphics({
      fillStyle: {
        color: Phaser.Display.Color.HexStringToColor("#555").color,
      },
    });

    this.add.text(loaderBoxSize.x + loaderBoxSize.width / 2, loaderBoxSize.y - loaderBoxSize.heigth / 2, "Loading...", {
      fontSize: 20,
    }).setOrigin(.5);
    this._progressPercentageText = this.add.text(loaderBoxSize.x + loaderBoxSize.width / 2, loaderBoxSize.y + loaderBoxSize.heigth / 2, "0%").setOrigin(.5);

    return loaderBoxSize;
  }

  generateTextures(): void {
    let graphicsTexture = this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, 50, 50);
    graphicsTexture.generateTexture(TextureNames.RECT, 50, 50);
    graphicsTexture.clear();
    graphicsTexture.destroy();

    graphicsTexture = this.make.graphics().fillStyle(0xffff00).fillCircle(10, 10, 10);
    graphicsTexture.generateTexture(TextureNames.CIRCLE, 20, 20);
    graphicsTexture.clear();
    graphicsTexture.destroy();

    const lineWidth: number = 2;
    graphicsTexture = this.make.graphics().lineStyle(lineWidth, 0x00ff00)
      .strokeTriangle(50 + lineWidth, lineWidth, 100 + lineWidth, 50 + lineWidth, lineWidth, 50 + lineWidth);
    graphicsTexture.generateTexture(TextureNames.TRIANGLE, 100 + lineWidth * 2, 50 + lineWidth * 2);
    graphicsTexture.clear();
    graphicsTexture.destroy();

    graphicsTexture = this.make.graphics().lineStyle(lineWidth, 0x00ff00).strokePoints([
      { x: 50 + lineWidth, y: lineWidth },
      { x: 100 + lineWidth, y: lineWidth },
      { x: 150 + lineWidth, y: 50 + lineWidth },
      { x: lineWidth, y: 50 + lineWidth },
    ], true);
    graphicsTexture.generateTexture(TextureNames.TRAPEZIUM, 150 + lineWidth * 2, 50 + lineWidth * 2);
    graphicsTexture.clear();
    graphicsTexture.destroy();

    graphicsTexture = this.make.graphics().lineStyle(lineWidth, 0x00ff00).strokePoints([
      { x: lineWidth, y: 25 + lineWidth },
      { x: 50 + lineWidth, y: lineWidth },
      { x: 100 + lineWidth, y: 25 + lineWidth },
      { x: 100 + lineWidth, y: 75 + lineWidth },
      { x: 50 + lineWidth, y: 100 + lineWidth },
      { x: lineWidth, y: 75 + lineWidth },
    ], true);
    graphicsTexture.generateTexture(TextureNames.HEXAGON, 100 + lineWidth * 2, 100 + lineWidth * 2);
    graphicsTexture.clear();
    graphicsTexture.destroy();

  }

  create() {
  }

  update(time: number, delta: number): void {
  }
}
