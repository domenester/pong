import { Position } from "../position";
import { Stick } from "../stick";
import { Ball } from "../ball";
import { BallEvents } from "../ball/events";
import { StickEvent } from "../stick";
import { getDimensions } from "../../panel/util";
import { TDispatch } from "../../../shared/state-handler";
import { ISocketService } from "../../../services";

export type mode = 'singleplayer' | 'multiplayer'

export class Panel {

  public defaultColor = '#000'

  public ctx: any
  public width: number
  public height: number
  public topBarHeight: number
  public stickWidth: number
  public stickHeight: number
  public moveSize: number

  public leftStick: Stick
  public rightStick: Stick
  public ball: Ball

  public score = 0
  public higherScore = 0

  constructor(
    public mode: mode,
    public dispatch: TDispatch,
    public socketService: ISocketService,
    public player: number,
    public room: string
  ) {
    const el: any = document.getElementById('panel')
    this.ctx = el.getContext("2d")

    const { width, height, topBarHeight } = getDimensions(mode)
    this.width = width
    this.height = height
    this.topBarHeight = topBarHeight

    this.stickWidth = Math.ceil(this.width / 100)
    this.stickHeight = Math.ceil(this.height / 5)

    this.moveSize = Math.ceil(this.width / 50)

    this.leftStick = new Stick(
      this.ctx,
      new Position(0, 0),
      this.defaultColor,
      this.stickWidth,
      this.stickHeight
    )
    this.rightStick = new Stick(
      this.ctx,
      new Position(
        this.width - this.stickWidth,
        mode === 'multiplayer' ? 0 : Infinity
      ),
      this.defaultColor,
      this.stickWidth,
      this.stickHeight
    )
    this.ball = new Ball(
      this.ctx,
      this,
      new Position(
        this.stickWidth * 3,
        this.stickWidth * 3
      ),
      this.defaultColor,
      this.stickWidth,
      this.stickWidth
    )
  }

  isMultiplayer = () => {
    return this.mode === 'multiplayer'
  }

  getOtherPlayer = () => {
    return this.player === 1 ? 2 : 1
  }

  increaseScore = () => {
    this.score = this.score + 1
    this.dispatch({
      type: 'setPanel',
      payload: {
        score: this.score
      }
    })
    if (this.score > this.higherScore) {
      this.higherScore = this.score
      this.dispatch({
        type: 'setPanel',
        payload: {
          higherScore: this.score
        }
      })
    }
  }

  reset = () => {
    this.dispatch({
      type: 'setPanel',
      payload: {
        score: 0,
        lastScore: this.score
      }
    })
    this.score = 0
    this.ball.clear()
    this.ball.resetSpeed()
    this.ball.position.reset()
  }

  resetSticks = () => {
    this.leftStick.reset()
    this.rightStick.reset()
  }

  bootstrap = () => {
    this.drawElements()
    const ballEvents = new BallEvents(this)
    ballEvents.bootstrap()
    const mouseEvents = new StickEvent(this)
    mouseEvents.bootstrap()
  }

  drawElements() {
    const { leftStick, ball, mode, rightStick } = this
    leftStick.print()
    ball.print()
    if (mode === 'multiplayer') {
      rightStick.print()
    }
  }
}