import { Position } from "../position";
import { Stick } from "../stick";
import { Ball } from "../ball";
import { getDimensions } from "../../panel/util";
import { TDispatch } from "../../../shared/state-handler";
import { ISocketService } from "../../../services";

export type mode = 'singleplayer' | 'multiplayer'

export abstract class Panel {

  public defaultColor = '#000'

  public ctx: any
  public width: number
  public height: number
  public topBarHeight: number
  public stickWidth: number
  public stickHeight: number
  public moveSize: number

  public leftStick: Stick
  public ball: Ball

  public hit = 0
  public higherHit = 0

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

  increaseHit = () => {
    this.hit = this.hit + 1
    this.dispatch({
      type: 'setPanel',
      payload: { hit: this.hit }
    })
    if (this.hit > this.higherHit) {
      this.higherHit = this.hit
      this.dispatch({
        type: 'setPanel',
        payload: { higherHit: this.hit }
      })
    }
  }

  reset = () => {
    this.dispatch({
      type: 'setPanel',
      payload: { hit: 0, lastHit: this.hit }
    })
    this.hit = 0
    this.ball.clear()
    this.ball.resetSpeed()
    this.ball.position.reset()
  }

  abstract drawElements: () => void
}