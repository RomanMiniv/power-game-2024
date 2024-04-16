import Phaser from "phaser";
import Boot from "./game/scenes/Boot";
import Menu from "./game/scenes/Menu";

const parent = document.getElementById("root") as HTMLDivElement;

const config: Phaser.Types.Core.GameConfig = {
  title: "power-game-2024",
  parent: parent,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1366,
    height: 768,
  },
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {},
  },
  scene: [Boot, Menu],
};

const game = new Phaser.Game(config);
