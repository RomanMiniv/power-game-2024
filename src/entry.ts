import Phaser from "phaser";
import Boot from "./game/scenes/Boot/Boot";
import Menu from "./game/scenes/Menu/Menu";
import Game from "./game/scenes/Game/Game";
import Options from "./game/scenes/Menu/scenes/Options/Options";
import ExtraFeatures from "./game/scenes/Menu/scenes/ExtraFeatures/ExtraFeatures";
import Credits from "./game/scenes/Menu/scenes/Credits/Credits";
import Popup from "./game/scenes/Popup/Popup";

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
  scene: [Boot, Menu, Options, ExtraFeatures, Credits, Game, Popup],
};

const game = new Phaser.Game(config);
