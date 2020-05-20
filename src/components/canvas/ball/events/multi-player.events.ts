import { PanelMultiPlayer } from "../../panel/multi-player";
import { BallEvents } from "./events";
import { BallInterval } from "../interval";

export class BallEventsMultiPlayer extends BallEvents {

  constructor(
    public panel: PanelMultiPlayer
  ) {
    super(panel)
  }
  
  public interval: any

  bootstrap = () => {
    this.panel.socketService.onStartGame(this.countDownToStartGame)
    this.panel.socketService.onBallOver(this.triggerReset)
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