import { Position } from "./position";
import { Panel } from "./panel";

export class InfoBar {
  constructor(
    private ctx: any,
    private position: Position,
    private panel: Panel
  ){}

  printScore = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000';
    this.ctx.font = "40px Arial";
    this.ctx.fillText(
      `Score: ${this.panel.score}`,
      this.panel.width / 2 - 300,
      40
    );
  }

  printHigherScore = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000';
    this.ctx.font = "40px Arial";
    this.ctx.fillText(
      `Higher: ${this.panel.higherScore}`,
      this.panel.width / 2 + 100,
      40
    );
  }

  print = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#CCC';
    const { getX, getY } = this.position
    this.ctx.fillRect(
      getX(),
      getY(),
      this.panel.width,
      this.panel.barHeight
    );
    this.printScore()
    this.printHigherScore()
  }
}