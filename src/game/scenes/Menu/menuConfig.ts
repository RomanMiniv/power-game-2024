import { SceneNames } from "../../shared/Names";

interface IMenuConfig {
  label: string;
  sceneKey?: string;
}

export const menuConfig: IMenuConfig[] = [
  {
    "label": "Continue (0%)",
    "sceneKey": SceneNames.GAME
  },
  {
    "label": "Start new game",
    "sceneKey": SceneNames.GAME
  },
  {
    "label": "Options",
    "sceneKey": SceneNames.OPTIONS
  },
  {
    "label": "Extra Features",
    "sceneKey": SceneNames.EXTRA_FEATURES
  },
  {
    "label": "Credits",
    "sceneKey": SceneNames.CREDITS
  },
  {
    "label": "Quit"
  }
];
