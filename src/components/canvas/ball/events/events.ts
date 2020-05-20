import { Panel } from "../../panel";
import { Ball } from "../ball";
import { Stick } from "../../stick";

export abstract class BallEvents {

  public ball: Ball
  public leftStick: Stick
  public timesHit = 0
  public initialAction: string = 'moveDownRight'
  public lastAction: string = this.initialAction

  constructor(
    public panel: Panel
  ) {
    this.ball = panel.ball
    this.leftStick = panel.leftStick
  }
  
  public interval: any

  speedUp = () => {
    if (this.timesHit % 3 === 0) {
      this.ball.speedUpMove()
    }
  }

  triggerReset = () => {
    console.log('triggerReset: this.lastAction: ', this.lastAction);
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

  abstract defineInterval: () => void
}