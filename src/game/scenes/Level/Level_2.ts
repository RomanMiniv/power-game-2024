import { IPosition } from "../../shared/Types";
import { Level } from "./Level";

interface IGameCell {
  view: Phaser.GameObjects.Graphics;
  state: ECellState;
  pos: number[];  // [reel, row]
}

enum ECellState {
  EMPTY = -1,
  PC = 0,
  Player = 1,
}

export class Level_2 extends Level {
  private _firstPCChoice: number[] = [1, 1];
  private _playerStep: number = 0;
  private _gameArea: IGameCell[][] = [];
  private _gameAreaContainer: Phaser.GameObjects.Container

  private readonly _groupAmount: number = 3;
  private readonly _cellSize: number = 110;
  private readonly _lineWidth: number = 4;
  private readonly _cellOffset: number = (this._cellSize / 10) + this._lineWidth;

  constructor() {
    super({
      key: "Level_2",
    });
  }

  init(data: unknown) {
  }

  preload() {
  }

  create() {
    this.setGameArea();
    this._gameArea[this._firstPCChoice[0]][this._firstPCChoice[1]].view.emit("pointerdown", false);
  }
  setGameArea() {
    const { width, height } = this.scale;

    this._gameAreaContainer = this.add.container(width / 2, height / 2);

    for (let reel = 0; reel < this._groupAmount; reel++) {
      this._gameArea[reel] = [];
      for (let row = 0; row < this._groupAmount; row++) {
        const x = reel * (this._cellSize + this._cellOffset);
        const y = row * (this._cellSize + this._cellOffset);
        const view = this.add.graphics().lineStyle(this._lineWidth, 0xffffff).strokeRect(x, y, this._cellSize, this._cellSize);

        view.setInteractive(new Phaser.Geom.Rectangle(x, y, this._cellSize, this._cellSize), Phaser.Geom.Rectangle.Contains)
          .on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
            view.setAlpha(.5);
          })
          .on("pointerout", () => {
            this.input.setDefaultCursor("default");
            view.clearAlpha();
          })
          .on("pointerdown", (isPlayerShape = true) => {
            view.emit("pointerout");
            view.disableInteractive();

            const cellState: ECellState = !!isPlayerShape ? ECellState.Player : ECellState.PC;
            this.drawShape([reel, row], !!cellState);
            this._gameArea[reel][row].state = cellState;

            if (cellState === ECellState.Player) {
              this._playerStep++;
              this.setPCChoice();
            }
          });

        this._gameAreaContainer.add(view);
        this._gameArea[reel].push({
          view,
          pos: [reel, row],
          state: ECellState.EMPTY
        });
      }
    }
    const sideSize: number = this._groupAmount * this._cellSize + this._groupAmount * (this._cellOffset - 1);
    this._gameAreaContainer.x -= sideSize / 2;
    this._gameAreaContainer.y -= sideSize / 2 + this._cellSize / 2;
  }

  drawShape([reel, row]: number[], isPlayerShape: boolean): void {
    const pos = this.getCellPosByMatrix([reel, row]);
    const lineSize = this._cellSize / 4;

    const shape = isPlayerShape ? this.drawPlayerShape(pos, lineSize) : this.drawPCShape(pos, this._cellSize / 4);
    this._gameAreaContainer.add(shape);
  }
  getCellPosByMatrix([reel, row]: number[]): IPosition {
    return {
      x: reel * (this._cellSize + this._cellOffset) + this._cellSize / 2,
      y: row * (this._cellSize + this._cellOffset) + this._cellSize / 2,
    }
  }
  drawPlayerShape(pos: IPosition, lineSize: number): Phaser.GameObjects.Graphics {
    const shape = this.add.graphics().lineStyle(this._lineWidth, 0xffff00);
    shape.beginPath();
    shape.lineBetween(-lineSize, -lineSize, lineSize, lineSize);
    shape.lineBetween(lineSize, -lineSize, -lineSize, lineSize);
    shape.closePath();
    shape.x = pos.x;
    shape.y = pos.y;
    return shape;
  }
  drawPCShape(pos: IPosition, lineSize: number): Phaser.GameObjects.Graphics {
    const shape = this.add.graphics().lineStyle(this._lineWidth, 0xffff00).strokeCircle(pos.x, pos.y, lineSize);
    return shape;
  }

  setPCChoice(): void {
    if (this._playerStep === 2) {
      const PCCell2 = this._gameArea.flat(1).filter(cell => cell.state === ECellState.PC)
        .find(cell => cell.pos.toString() !== this._firstPCChoice.toString());

      let cellPos: number[] = []
      PCCell2.pos.forEach(pos => {
        if (!pos) {
          cellPos.push(-1);
        } else if (pos === this._groupAmount - 1) {
          cellPos.push(1);
        } else {
          cellPos.push(0);
        }
      });

      const cellPosByMatrix: number[] = [PCCell2.pos[0] + cellPos[0], PCCell2.pos[1] + cellPos[1]];
      this.drawShape(cellPosByMatrix, false);

      this.setResult(this.getCellPosByMatrix(this._firstPCChoice), this.getCellPosByMatrix(cellPosByMatrix));
    } else {
      const emptyCells = this._gameArea.flat(1).filter(cell => cell.state === ECellState.EMPTY);
      Phaser.Utils.Array.GetRandom(emptyCells).view.emit("pointerdown", false);
    }
  }
  setResult(startPos: IPosition, endPos: IPosition): void {
    this.input.enabled = false;
    const winLine = this.add.graphics().lineStyle(this._lineWidth * 2, 0xff0000).lineBetween(startPos.x, startPos.y, endPos.x, endPos.y);
    this._gameAreaContainer.add(winLine);

    const text = "Haha, that's crazy";
    this.showHint(text);
    this.playAudioSpeech(text);

    this.time.delayedCall(2500, () => {
      this.showPower();
    });
  }

  update(time: number, delta: number): void {
  }
}
