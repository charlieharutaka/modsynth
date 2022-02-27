import { atom } from 'jotai'

const updateRate = atom(30)

const positionX = atom(0)
const positionY = atom(0)
const zoomRatio = atom(100)
const viewWidth = atom(0)
const viewHeight = atom(0)

const canvasWidth = atom(get => get(viewWidth) * (get(zoomRatio) / 100))
const canvasHeight = atom(get => get(viewHeight) * (get(zoomRatio) / 100))

const leftBound = atom(get => get(positionX) + get(canvasWidth) / 2)
const rightBound = atom(get => get(positionX) - get(canvasWidth) / 2)
const topBound = atom(get => get(positionY) + get(canvasHeight) / 2)
const bottomBound = atom(get => get(positionY) - get(canvasHeight) / 2)

export {
  updateRate,
  positionX,
  positionY,
  zoomRatio,
  viewWidth,
  viewHeight,
  canvasWidth,
  canvasHeight,
  leftBound,
  rightBound,
  topBound,
  bottomBound,
}
