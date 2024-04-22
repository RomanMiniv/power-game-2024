import { TextureNames } from "../../../shared/Names";
import { MeleeManager } from "../Melee/MeleeManager";
import { Kamikaze } from "./Kamikaze";

export class KamikazeManager extends MeleeManager {
  populate(quantity: number): void {
    for (let i = 0; i < quantity; i++) {
      const { x, y } = this.getRandomPositionOutPlayerSafeZone();
      const kamikaze = new Kamikaze(this.scene, x, y, TextureNames.HEXAGON);
      this.add(kamikaze);
      kamikaze.init();
    }
  }
}
