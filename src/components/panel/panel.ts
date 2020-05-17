import { Position } from "./position";
import { Stick } from "./stick";
import { Ball } from "./ball";
import { KeyboardEvents } from "./events/keyboard.events";
import { BallEvents } from "./events/ball.events";
import { StickEvent } from "./events/stick.events";
import { InfoBar } from "./info-bar";

export class Panel {

  public defaultColor = '#000'
  public stickWidth = Math.ceil(this.width / 100)
  public stickHeight = Math.ceil(this.height / 5)
  public moveSize = Math.ceil(this.width / 50)

  public infoBar: InfoBar
  public leftStick: Stick
  public rightStick: Stick
  public ball: Ball

  public barHeight = 50
  public score = 0
  public higherScore = 0

  constructor(
    public ctx: any,
    public width: number,
    public height: number
  ) {
    this.leftStick = new Stick(
      this.ctx,
      new Position(0, this.barHeight),
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
      new Position(
        this.stickWidth * 5,
        this.stickWidth * 5
      ),
      this.defaultColor,
      this.stickWidth,
      this.stickWidth
    )
    this.infoBar = new InfoBar(
      this.ctx,
      new Position(0, 0),
      this
    )
  }

  increaseScore = () => {
    this.score = this.score + 1
    if (this.score > this.higherScore) {
      this.higherScore = this.score
    }
  }

  reset = () => {
    this.score = 0
    this.leftStick.position.reset()
    this.ball.position.reset()
    this.infoBar.print()
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
    const { leftStick, infoBar, ball } = this
    infoBar.print()
    leftStick.print()
    ball.print()
  }
}