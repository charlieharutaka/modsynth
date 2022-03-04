import { atom } from 'jotai'

const updateRate = atom(120)

const positionX = atom(0)
const positionY = atom(0)
const canvasWidth = atom(0)
const canvasHeight = atom(0)

const leftBound = atom(get => get(positionX) + get(canvasWidth) / 2)
const rightBound = atom(get => get(positionX) - get(canvasWidth) / 2)
const topBound = atom(get => get(positionY) + get(canvasHeight) / 2)
const bottomBound = atom(get => get(positionY) - get(canvasHeight) / 2)

export {
  updateRate,
  positionX,
  positionY,
  canvasWidth,
  canvasHeight,
  leftBound,
  rightBound,
  topBound,
  bottomBound,
}
