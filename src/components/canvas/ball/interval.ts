import { BallTriggers } from "./triggers"
import { BallEventsMultiPlayer } from "./events/multi-player.events"
import { BallEventsSinglePlayer } from "./events/single-player.events"

export const BallInterval = (
  ballEvents: BallEventsMultiPlayer | BallEventsSinglePlayer
) => {
  const triggers: any = BallTriggers(ballEvents.ball)
  return {
    init: () => {
      let trigger
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
        trigger = triggers[ `touchDownFrom${ballEvents.lastActionUpper()}` ]
        if (trigger) ballEvents.lastAction = trigger()
        return
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

        trigger = triggers[ `touchUpFrom${ballEvents.lastActionUpper()}` ]
        if (trigger) ballEvents.lastAction = trigger()
        return
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