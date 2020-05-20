import { mode } from '../canvas/panel/'

export const getDimensions = (mode: mode) => {
  const { clientWidth, clientHeight } = document.documentElement
  const width = mode === 'singleplayer' ? clientWidth : 1000
  const height = mode === 'singleplayer' ? clientHeight : 600
  const topBarHeight = width / 20
  return {
    width,
    height: height - topBarHeight,
    topBarHeight
  }
}