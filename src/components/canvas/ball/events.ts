import { Panel } from "../panel";
import { Ball } from "./ball";
import { Stick } from "../stick";
import { BallInterval } from "./interval";

export class BallEvents {

  public ball: Ball
  public leftStick: Stick
  public timesHit = 0

  constructor(
    public panel: Panel
  ) {
    this.ball = panel.ball
    this.leftStick = panel.leftStick
  }
  
  public interval: any

  bootstrap = () => {
    if (this.panel.mode === 'multiplayer') {
      this.panel.socketService.onStartGame(this.countDownToStartGame)
      return this.panel.socketService.onBallOver(this.triggerReset)
    }
    this.defineInterval()
  }

  speedUp = () => {
    if (this.timesHit % 3 === 0) {
      this.ball.speedUpMove()
    }
  }

  initialAction: string = 'moveDownRight'
  lastAction: string = this.initialAction

  triggerReset = () => {
    clearInterval(this.interval)
    this.timesHit = 0
    this.panel.reset()
    this.lastAction = this.initialAction
    setTimeout(() => this.defineInterval(), 2000)
  }

  lastActionUpper = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return this.lastAction.charAt(0).toUpperCase() + this.lastAction.slice(1)
  }

  touchDown = () => {
    return this.ball.position.getY() >= this.panel.height - this.ball.width
  }

  touchUp = () => {
    return this.ball.position.getY() <= this.ball.width
  }

  touchLeft = () => {
    const touch = this.ball.position.getX() <= this.ball.width
    if (touch) {
      if (this.ball.touchLeftStick()) {
        this.timesHit = this.timesHit + 1
        this.panel.increaseScore()
        this.speedUp()
        return true
      }
      this.panel.socketService.ballOver(
        this.panel.room,
        this.panel.getOtherPlayer()
      )
      this.triggerReset()
    }
  }

  touchRight = () => {
    const touch = this.ball.position.getX() >= this.panel.width - this.ball.width
    if (touch) {
      if (!this.panel.isMultiplayer()) {
        return true
      }
      if (this.ball.touchRightStick()) {
        this.timesHit = this.timesHit + 1
        this.panel.increaseScore()
        return true
      }
      this.panel.socketService.ballOver(
        this.panel.room,
        this.panel.getOtherPlayer()
      )
      this.triggerReset()
    }
  }

  countDownToStartGame = () => {
    let value = 3
    this.panel.resetSticks()
    const counterDown = setInterval(
      () => {
        this.panel.dispatch({
          type: 'setCounterDown',
          payload: { value }
        })
        if (value === 0) {
          this.defineInterval()
          clearInterval(counterDown)
        }
        value--
      },
      1000
    )
  }

  defineInterval = () => {
    this.interval = setInterval(
      () => BallInterval(this).init(), 5
    )
  }
}