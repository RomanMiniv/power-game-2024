import { IPosition } from "./Types";

interface IZone {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function getRandomPositionAtZone(innerZone: IZone, outerZone: IZone): IPosition {
  return {
    x: Phaser.Math.Between(0, 1) ? Phaser.Math.Between(outerZone.x1, innerZone.x1) : Phaser.Math.Between(innerZone.x2, outerZone.x2),
    y: Phaser.Math.Between(0, 1) ? Phaser.Math.Between(outerZone.y1, innerZone.y1) : Phaser.Math.Between(innerZone.y2, outerZone.y2)
  };
}
