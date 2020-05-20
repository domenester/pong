import { BallEvents } from "./events"
import { BallTriggers } from "./triggers"

export const BallInterval = (
  ballEvents: BallEvents
) => {
  const triggers: any = BallTriggers(ballEvents.ball)
  return {
    init: () => {
      if (ballEvents.touchDown()) {
        if (ballEvents.touchLeft()) {
          return (
            ballEvents.lastAction = triggers[
              `touchDownAndLeftFrom${ballEvents.lastActionUpper()}`
            ]())
        }
        if (ballEvents.touchRight()) {
          return (
            ballEvents.lastAction = triggers[
              `touchDownAndRightFrom${ballEvents.lastActionUpper()}`
            ]())
        }
        return (
          ballEvents.lastAction = triggers[
            `touchDownFrom${ballEvents.lastActionUpper()}`
          ]())
      }

      if (ballEvents.touchUp()) {
        if (ballEvents.touchLeft()) {
          return (
            ballEvents.lastAction = triggers[
              `touchUpAndLeftFrom${ballEvents.lastActionUpper()}`
            ]())
        }
        if (ballEvents.touchRight()) {
          return (
            ballEvents.lastAction = triggers[
              `touchUpAndRightFrom${ballEvents.lastActionUpper()}`
            ]())
        }
        return (
          ballEvents.lastAction = triggers[
            `touchUpFrom${ballEvents.lastActionUpper()}`
          ]())
      }

      if (ballEvents.touchRight()) {
        return (
          ballEvents.lastAction = triggers[
            `touchRightFrom${ballEvents.lastActionUpper()}`
          ]())
      }

      if (ballEvents.touchLeft()) {
        return (
          ballEvents.lastAction = triggers[
            `touchLeftFrom${ballEvents.lastActionUpper()}`
          ]())
      }

      (ballEvents.ball as any)[ballEvents.lastAction]()
    }
  }
}