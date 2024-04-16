export default class Boot extends Phaser.Scene {
  loaderProgressBar: Phaser.GameObjects.Graphics;
  progressPercentageText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "Boot",
    });
  }

  init(data: unknown) {
  }

  preload() {
    const loaderBoxSize = this.drawBootloader();

    this.load.on("progress", (amount: number) => {
      this.loaderProgressBar.fillRect(loaderBoxSize.x + 10, loaderBoxSize.y + 10, (loaderBoxSize.width - 20) * amount, loaderBoxSize.heigth - 20);
      this.progressPercentageText.setText(parseInt((String(amount * 100))) + "%");
    });
    this.load.on("complete", () => {
      this.scene.start("Menu");
    });

    // mock bootloader
    // here load all assets
    this.load.image("prince", "https://cdn2.unrealengine.com/popsot-1920x1081-3d5b172f8bc6.jpg");
    for (let i = 0; i < 50; i++) {
      this.load.image("prince" + i, "https://cdn2.unrealengine.com/popsot-1920x1081-3d5b172f8bc6.jpg");
    }
  }

  drawBootloader() {
    const {width: cWidth, height: cHeight} = this.game.canvas;
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

    this.loaderProgressBar = this.add.graphics({
      fillStyle: {
        color: Phaser.Display.Color.HexStringToColor("#555").color,
      },
    });

    this.add.text(loaderBoxSize.x + loaderBoxSize.width / 2, loaderBoxSize.y - loaderBoxSize.heigth / 2, "Loading...", {
      fontSize: 20,
    }).setOrigin(.5);
    this.progressPercentageText = this.add.text(loaderBoxSize.x + loaderBoxSize.width / 2, loaderBoxSize.y + loaderBoxSize.heigth / 2, "0%").setOrigin(.5);

    return loaderBoxSize;
  }

  create() {
  }

  update(time: number, delta: number): void {
  }
}
