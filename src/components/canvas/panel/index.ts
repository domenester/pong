import { Position } from "../position";
import { Stick } from "../stick";
import { Ball } from "../ball";
import { KeyboardEvents } from "../events";
import { BallEvents } from "../ball";
import { StickEvent } from "../stick";

export class Panel {

  public defaultColor = '#000'
  public stickWidth = Math.ceil(this.width / 100)
  public stickHeight = Math.ceil(this.height / 5)
  public moveSize = Math.ceil(this.width / 50)

  public leftStick: Stick
  public rightStick: Stick
  public ball: Ball

  public score = 0
  public higherScore = 0

  constructor(
    public ctx: any,
    public width: number,
    public height: number,
    public setters: any
  ) {
    this.leftStick = new Stick(
      this.ctx,
      new Position(0, 0),
      this.defaultColor,
      this.stickWidth,
      this.stickHeight
    )
    this.rightStick = new Stick(
      this.ctx,
      new Position(this.width - this.stickWidth, 0),
      this.defaultColor,
      this.stickWidth,
      this.stickHeight
    )
    this.ball = new Ball(
      this.ctx,
      this,
      new Position(
        Math.ceil(this.stickWidth * 3),
        Math.ceil(this.stickWidth * 3)
      ),
      this.defaultColor,
      this.stickWidth,
      this.stickWidth
    )
  }

  increaseScore = () => {
    this.score = this.score + 1
    this.setters.setScore(this.score)
    if (this.score > this.higherScore) {
      this.higherScore = this.score
      this.setters.setHigherScore(this.score)
    }
  }

  reset = () => {
    this.setters.setLastScore(this.score)
    this.setters.setScore(0)
    this.score = 0
    this.ball.clear()
    this.ball.resetSpeed()
    this.ball.position.reset()
  }

  bootstrap = () => {
    this.drawElements()
    const keyboardEvents = new KeyboardEvents(this)
    keyboardEvents.bootstrap()
    const ballEvents = new BallEvents(this)
    ballEvents.bootstrap()
    const mouseEvents = new StickEvent(this)
    mouseEvents.bootstrap()
  }

  drawElements() {
    const { leftStick, ball } = this
    leftStick.print()
    ball.print()
  }
}