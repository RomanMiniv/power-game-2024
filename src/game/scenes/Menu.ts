export default class Menu extends Phaser.Scene {
  constructor() {
    super({
      key: "Menu",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, "Menu!!!!").setOrigin(.5);

    const prince = this.add.image(this.game.canvas.width / 2, 150, "prince").setOrigin(.5);
    prince.displayWidth = 200;
    prince.displayHeight = 200;
  }

  update(time: number, delta: number): void {
    
  }
}
