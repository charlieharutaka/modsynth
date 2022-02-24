import { Paper } from '@mui/material'
import { useAtom } from 'jotai'
import React, { FunctionComponent, useState } from 'react'
import * as CanvasState from './CanvasState'

type CanvasItemProps = {
  width?: number
  height?: number
  initialX?: number
  initialY?: number
}

const CanvasItem: FunctionComponent<CanvasItemProps> = ({
  children,
  width = 120,
  height = 120,
  initialX = 0,
  initialY = 0,
}) => {
  const [canvasPositionX] = useAtom(CanvasState.positionX)
  const [canvasPositionY] = useAtom(CanvasState.positionY)
  const [canvasZoomRatio] = useAtom(CanvasState.zoomRatio)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)

  const [positionX, setPositionX] = useState(initialX)
  const [positionY, setPositionY] = useState(initialY)

  const left = canvasWidth / 2 + canvasPositionX - width / 2 + positionX
  const top = canvasHeight / 2 + canvasPositionY - height / 2 + positionY

  return (
    <Paper
      sx={{
        position: 'fixed',
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{ left, top }}
    >
      {children}
    </Paper>
  )
}

export { CanvasItem as default }
