import { Panel } from "../../panel";
import { BallEvents } from "./events";
import { BallInterval } from "../interval";

export class BallEventsSinglePlayer extends BallEvents {

  constructor(
    public panel: Panel
  ) {
    super(panel)
  }

  bootstrap = () => {
    this.defineInterval()
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
      this.triggerReset()
    }
  }

  touchRight = () => {
    return this.ball.position.getX() >= this.panel.width - this.ball.width
  }

  defineInterval = () => {
    this.interval = setInterval(
      () => BallInterval(this).init(), 5
    )
  }
}