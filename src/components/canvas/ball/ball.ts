import { Position } from "../position";
import { Panel } from "../panel";

export class Ball {

  public size = 10
  public speed: number
  public leftSide: number = 0

  constructor(
    public ctx: any,
    public panel: Panel,
    public position: Position,
    public color: string,
    public width: number,
    public height: number,
  ) {
    this.speed = 2
    this.setLeftSide()
  }

  setLeftSide = () => {
    this.leftSide = this.position.getX() - this.width
  }

  resetSpeed = () => {
    this.speed = 2
  }

  touchStick = () => {
    const { leftStick } = this.panel
    const ballY = this.position.getY()
    const stickY = leftStick.position.getY()
    const touchX = this.leftSide <= leftStick.width
    const touchY = ballY >= stickY
    const ballOnStick = ballY <= leftStick.height + stickY
    return touchX && touchY && ballOnStick
  }

  clear = () => {
    const { getX } = this.position
    let diff = 0
    if (this.touchStick() && this.leftSide < this.width) {
      diff = this.width - this.leftSide
    }
    this.ctx.clearRect(
      getX() - this.width + diff,
      this.position.getY() - this.width,
      (this.width + diff) * 2,
      this.height * 2
    );
  }

  speedUpMove = () => {
    if (this.speed >= this.width) return;
    this.speed = this.speed + 1
  }

  moveDownRight = () => {
    const { getX, setX, getY, setY } = this.position
    this.clear()
    setX( getX() + this.speed )
    setY( getY() + this.speed )
    this.print()
  }

  moveUpRight = () => {
    const { getX, setX, getY, setY } = this.position
    this.clear()
    setX( getX() + this.speed )
    setY( getY() - this.speed )
    this.print()
  }

  moveDownLeft = () => {
    const { getX, setX, getY, setY } = this.position
    this.clear()
    setX( getX() - this.speed )
    setY( getY() + this.speed )
    this.print()
  }

  moveUpLeft = () => {
    const { getX, setX, getY, setY } = this.position
    this.clear()
    setX( getX() - this.speed )
    setY( getY() - this.speed )
    this.print()
  }

  print = () => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color
    this.ctx.arc(
      this.position.getX(),
      this.position.getY(),
      this.width,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.setLeftSide()
  }

}