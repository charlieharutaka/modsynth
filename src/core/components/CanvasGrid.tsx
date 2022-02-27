import { Box, Paper, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
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

  const top = vertical
    ? 0
    : (canvasHeight / 2 + canvasPositionY + positionY) / (canvasZoomRatio / 100)
  const left = vertical
    ? (canvasWidth / 2 + canvasPositionX + positionX) / (canvasZoomRatio / 100)
    : 0

  return (
    <Box
      sx={{
        position: 'fixed',
        width: vertical ? width : viewWidth,
        height: vertical ? viewHeight : width,
        backgroundColor: color,
      }}
      style={{ top, left }}
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
  const [positionX] = useAtom(CanvasState.positionX)
  const [positionY] = useAtom(CanvasState.positionY)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)

  const numVertical = canvasWidth / gridSpacingX + 1
  const numHorizontal = canvasHeight / gridSpacingY + 1

  const leftmostX = -(Math.ceil(numVertical / 2) * gridSpacingX)
  const lowermostY = -(Math.ceil(numHorizontal / 2) * gridSpacingY)
  const offsetX = (Math.ceil(positionX / gridSpacingX) - 1) * gridSpacingX
  const offsetY = (Math.ceil(positionY / gridSpacingY) - 1) * gridSpacingY

  const verticals = useMemo(() => {
    const xs = []
    for (
      let x = leftmostX - offsetX;
      x < gridSpacingX * numVertical + leftmostX - offsetX;
      x += gridSpacingX
    )
      xs.push(x)
    return xs
  }, [gridSpacingX, leftmostX, numVertical, offsetX])
  const horizontals = useMemo(() => {
    const ys = []
    for (
      let y = lowermostY - offsetY;
      y < gridSpacingY * numHorizontal + lowermostY - offsetY;
      y += gridSpacingY
    )
      ys.push(y)
    return ys
  }, [gridSpacingY, lowermostY, numHorizontal, offsetY])

  return (
    <>
      {verticals.map((x, i) => (
        <CanvasGridLine
          vertical
          positionX={x}
          positionY={0}
          width={2}
          key={i}
        />
      ))}
      {horizontals.map((y, i) => (
        <CanvasGridLine
          horizontal
          positionX={0}
          positionY={y}
          width={2}
          key={i}
        />
      ))}
    </>
  )
}

export { CanvasGrid as default }
