import { Panel } from "../panel";
import { Ball } from "../ball";
import { Stick } from "../stick";

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
    this.defineInterval()
  }

  speedUp = () => {
    if (this.timesHit % 3 === 0) {
      this.ball.speedUpMove()
    }
  }

  touchStick = () => {
    const { ball, leftStick } = this
    const ballY = this.ball.position.getY()
    const stickY = this.leftStick.position.getY()
    const touchX = ball.leftSide <= leftStick.width
    const touchY = ballY >= stickY
    const ballOnStick = ballY <= this.leftStick.height + stickY
    return touchX && touchY && ballOnStick
  }

  triggers: any = {
    'touchRightFromMoveUpRight': () => {
      this.ball.moveUpLeft()
      return 'moveUpLeft'
    },
    'touchRightFromMoveDownRight': () => {
      this.ball.moveDownLeft()
      return 'moveDownLeft'
    },
    'touchLeftFromMoveUpLeft': () => {
      this.ball.moveUpRight()
      return 'moveUpRight'
    },
    'touchLeftFromMoveDownLeft': () => {
      this.ball.moveDownRight()
      return 'moveDownRight'
    },
    'touchDownFromMoveDownRight': () => {
      this.ball.moveUpRight()
      return 'moveUpRight'
    },
    'touchDownAndRightFromMoveDownRight': () => {
      this.ball.moveUpLeft()
      return 'moveUpLeft'
    },
    'touchDownFromMoveDownLeft': () => {
      this.ball.moveUpLeft()
      return 'moveUpLeft'
    },
    'touchDownAndLeftFromMoveDownLeft': () => {
      this.ball.moveUpRight()
      return 'moveUpRight'
    },
    'touchUpFromMoveUpRight': () => {
      this.ball.moveDownRight()
      return 'moveDownRight'
    },
    'touchUpAndRightFromMoveUpRight': () => {
      this.ball.moveDownLeft()
      return 'moveDownLeft'
    },
    'touchUpFromMoveUpLeft': () => {
      this.ball.moveDownLeft()
      return 'moveDownLeft'
    },
    'touchUpAndLeftFromMoveUpLeft': () => {
      this.ball.moveDownRight()
      return 'moveDownRight'
    },
  }

  initialAction: string = 'moveDownRight'
  lastAction: string = this.initialAction

  triggerReset = () => {
    clearInterval(this.interval)
    this.timesHit = 0
    this.ball.clear()
    this.ball.resetSpeed()
    this.panel.reset()
    this.lastAction = this.initialAction
    setTimeout(this.defineInterval, 2000)
  }

  lastActionUpper = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return this.lastAction.charAt(0).toUpperCase() + this.lastAction.slice(1)
  }

  touchDown = () => {
    return this.ball.position.getY() >= this.panel.height - this.ball.width
  }

  touchUp = () => {
    return this.ball.position.getY() - this.panel.barHeight <= this.ball.width
  }

  touchLeft = () => {
    const touch = this.ball.position.getX() <= this.ball.width
    if (touch) {
      if (this.touchStick()) {
        this.timesHit = this.timesHit + 1
        this.panel.increaseScore()
        this.panel.infoBar.print()
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
      () => {
        if (this.touchDown()) {
          if (this.touchLeft()) {
            return (
              this.lastAction = this.triggers[
                `touchDownAndLeftFrom${this.lastActionUpper()}`
              ]())
          }
          if (this.touchRight()) {
            return (
              this.lastAction = this.triggers[
                `touchDownAndRightFrom${this.lastActionUpper()}`
              ]())
          }
          return (
            this.lastAction = this.triggers[
              `touchDownFrom${this.lastActionUpper()}`
            ]())
        }

        if (this.touchUp()) {
          if (this.touchLeft()) {
            return (
              this.lastAction = this.triggers[
                `touchUpAndLeftFrom${this.lastActionUpper()}`
              ]())
          }
          if (this.touchRight()) {
            return (
              this.lastAction = this.triggers[
                `touchUpAndRightFrom${this.lastActionUpper()}`
              ]())
          }
          return (
            this.lastAction = this.triggers[
              `touchUpFrom${this.lastActionUpper()}`
            ]())
        }

        if (this.touchRight()) {
          return (
            this.lastAction = this.triggers[
              `touchRightFrom${this.lastActionUpper()}`
            ]())
        }

        if (this.touchLeft()) {
          return (
            this.lastAction = this.triggers[
              `touchLeftFrom${this.lastActionUpper()}`
            ]())
        }

        (this.ball as any)[this.lastAction]()
      }, 5
    )
  }
}