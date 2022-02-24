import { Paper, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React, { FunctionComponent, useState } from 'react'
import * as CanvasState from './CanvasState'

type CanvasGridLineProps = {
  vertical?: boolean
  horizontal?: boolean
  color?: string
  width: number
  positionX: number
  positionY: number
}

const CanvasGridLine: FunctionComponent<CanvasGridLineProps> = ({
  vertical,
  width,
  positionX,
  positionY,
  color = '#eee',
}) => {
  const [viewHeight] = useAtom(CanvasState.viewHeight)
  const [viewWidth] = useAtom(CanvasState.viewWidth)

  const [canvasPositionX] = useAtom(CanvasState.positionX)
  const [canvasPositionY] = useAtom(CanvasState.positionY)
  const [canvasZoomRatio] = useAtom(CanvasState.zoomRatio)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)

  return (
    <div
      style={{
        position: 'fixed',
        width: vertical ? width : viewWidth,
        height: vertical ? viewHeight : width,
        backgroundColor: color,
        top: vertical
          ? 0
          : canvasHeight / 2 +
            canvasPositionY -
            width / 2 +
            positionY / (canvasZoomRatio / 100),
        left: vertical
          ? canvasWidth / 2 +
            canvasPositionX -
            width / 2 +
            positionX / (canvasZoomRatio / 100)
          : 0,
      }}
    />
  )
}

type CanvasGridProps = {
  gridSpacingX: number
  gridSpacingY: number
}

const CanvasGrid: FunctionComponent<CanvasGridProps> = ({
  gridSpacingX,
  gridSpacingY,
}) => {
  const [canvasPositionX] = useAtom(CanvasState.positionX)
  const [canvasPositionY] = useAtom(CanvasState.positionY)
  const [canvasZoomRatio] = useAtom(CanvasState.zoomRatio)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)

  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const numVertical = canvasWidth / gridSpacingX + 1
  const numHorizontal = canvasHeight / gridSpacingY + 1

  const leftmostX = -(Math.ceil(numVertical / 2) * gridSpacingX)
  const lowermostY = -(Math.ceil(numHorizontal / 2) * gridSpacingY)

  const verticals = []
  for (let x = 0; x < numVertical; x++) {
    verticals.push(gridSpacingX * x + leftmostX)
  }

  const horizontals = []
  for (let y = 0; y < numHorizontal; y++) {
    horizontals.push(gridSpacingY * y + lowermostY)
  }

  return (
    <>
      {verticals.map(x => (
        <CanvasGridLine vertical positionX={x} positionY={0} width={2} />
      ))}
      {horizontals.map(y => (
        <CanvasGridLine horizontal positionX={0} positionY={y} width={2} />
      ))}
    </>
  )
}

export { CanvasGrid as default }
