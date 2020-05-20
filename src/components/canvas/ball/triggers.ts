import { Ball } from "./ball"

export const BallTriggers = (ball: Ball) => ({
  'touchRightFromMoveUpRight': () => {
    ball.moveUpLeft()
    return 'moveUpLeft'
  },
  'touchRightFromMoveDownRight': () => {
    ball.moveDownLeft()
    return 'moveDownLeft'
  },
  'touchLeftFromMoveUpLeft': () => {
    ball.moveUpRight()
    return 'moveUpRight'
  },
  'touchLeftFromMoveDownLeft': () => {
    ball.moveDownRight()
    return 'moveDownRight'
  },
  'touchDownFromMoveDownRight': () => {
    ball.moveUpRight()
    return 'moveUpRight'
  },
  'touchDownAndRightFromMoveDownRight': () => {
    ball.moveUpLeft()
    return 'moveUpLeft'
  },
  'touchDownFromMoveDownLeft': () => {
    ball.moveUpLeft()
    return 'moveUpLeft'
  },
  'touchDownAndLeftFromMoveDownLeft': () => {
    ball.moveUpRight()
    return 'moveUpRight'
  },
  'touchUpFromMoveUpRight': () => {
    ball.moveDownRight()
    return 'moveDownRight'
  },
  'touchUpAndRightFromMoveUpRight': () => {
    ball.moveDownLeft()
    return 'moveDownLeft'
  },
  'touchUpFromMoveUpLeft': () => {
    ball.moveDownLeft()
    return 'moveDownLeft'
  },
  'touchUpAndLeftFromMoveUpLeft': () => {
    ball.moveDownRight()
    return 'moveDownRight'
  },
})