import { Position } from "../position";
import { Panel } from "../panel";
import { PanelMultiPlayer } from "../panel/multi-player";

export class Ball {

  public size = 10
  public speed: number

  constructor(
    public ctx: any,
    public panel: Panel,
    public position: Position,
    public color: string,
    public width: number,
    public height: number,
  ) {
    this.speed = 6
  }

  getLeftSide = () => {
    return this.position.getX() - this.width
  }

  getRightSide = () => {
    return this.position.getX() + this.width
  }

  resetSpeed = () => {
    this.speed = 6
  }

  touchStick = () => {
    return this.touchLeftStick() || (this.panel.mode === 'multiplayer' && this.touchRightStick())
  }

  touchLeftStick = () => {
    const { leftStick } = this.panel
    const ballY = this.position.getY()
    const stickY = leftStick.position.getY()
    const touchX = this.getLeftSide() <= leftStick.width
    const touchY = ballY >= stickY
    const ballOnStick = ballY <= leftStick.height + stickY
    return touchX && touchY && ballOnStick
  }

  touchRightStick = () => {
    const { rightStick } = this.panel as PanelMultiPlayer
    const ballY = this.position.getY()
    const stickY = rightStick.position.getY()
    const touchX = this.getRightSide() >= this.panel.width - rightStick.width
    const touchY = ballY >= stickY
    const ballOnStick = ballY <= rightStick.height + stickY
    return touchX && touchY && ballOnStick
  }

  rightStickWidth = () => {
    return this.panel.width - this.width
  }

  clear = () => {
    const { getX } = this.position
    let diff = 0
    let touchedAt = 'left'

    if (this.touchStick()) {
      if (this.getLeftSide() < this.width) {
        diff = this.width - this.getLeftSide()
      }
      if (this.getRightSide() > this.rightStickWidth()) {
        touchedAt = 'right'
        diff = this.getRightSide() - this.rightStickWidth()
      }
    }

    const startX = touchedAt === 'left' ? getX() - this.width + diff : getX() + this.width - diff
    const sizeX = touchedAt === 'left' ? (this.width + diff) * 2 : (this.width + diff) * -2

    this.ctx.clearRect(
      startX,
      this.position.getY() - this.height,
      sizeX,
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
  }

}