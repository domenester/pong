import { Position } from "./position";

export class Stick {

  constructor(
    public ctx: any,
    public position: Position,
    public defaultColor: string,
    public width: number,
    public height: number
  ) {}

  clear = () => {
    this.ctx.clearRect(
      this.position.getX(),
      this.position.getY(),
      this.width,
      this.height
    );
  }

  print = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.defaultColor;
    const { getX, getY } = this.position
    this.ctx.fillRect(
      getX(),
      getY(),
      this.width,
      this.height
    );
  }

}