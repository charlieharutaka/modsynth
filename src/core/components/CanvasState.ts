import { atom } from 'jotai'

const positionX = atom(0)
const positionY = atom(0)
const zoomRatio = atom(100)
const viewWidth = atom(0)
const viewHeight = atom(0)

const canvasWidth = atom(get => get(viewWidth) * (get(zoomRatio) / 100))
const canvasHeight = atom(get => get(viewHeight) * (get(zoomRatio) / 100))

export {
  positionX,
  positionY,
  zoomRatio,
  viewWidth,
  viewHeight,
  canvasWidth,
  canvasHeight,
}
