import _ from 'lodash'
import { Paper } from '@mui/material'
import { useAtom } from 'jotai'
import React, { FunctionComponent, MouseEventHandler, useState } from 'react'
import * as CanvasState from './CanvasState'

type CanvasItemProps = {
  width?: number
  height?: number
  initialPositionX?: number
  initialPositionY?: number
}

const CanvasItem: FunctionComponent<CanvasItemProps> = ({
  children,
  width = 120,
  height = 120,
  initialPositionX = 0,
  initialPositionY = 0,
}) => {
  const [canvasPositionX] = useAtom(CanvasState.positionX)
  const [canvasPositionY] = useAtom(CanvasState.positionY)
  const [canvasZoomRatio] = useAtom(CanvasState.zoomRatio)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)
  const [updateRate] = useAtom(CanvasState.updateRate)

  const [positionX, setPositionX] = useState(initialPositionX)
  const [positionY, setPositionY] = useState(initialPositionY)
  const [moving, setMoving] = useState(false)
  const [initialX, setInitialX] = useState(initialPositionX)
  const [initialY, setInitialY] = useState(initialPositionY)

  const left =
    (canvasWidth / 2 + canvasPositionX - width / 2 + positionX) /
    (canvasZoomRatio / 100)
  const top =
    (canvasHeight / 2 + canvasPositionY - height / 2 + positionY) /
    (canvasZoomRatio / 100)

  const handleMouseMove: MouseEventHandler = _.throttle(event => {
    event.preventDefault()
    event.stopPropagation()
    if (!moving) return

    setPositionX(event.clientX - initialX)
    setPositionY(event.clientY - initialY)
  }, 1000 / updateRate)
  const handleMouseDown: MouseEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    setMoving(true)
    setInitialX(event.clientX - positionX)
    setInitialY(event.clientY - positionY)
  }
  const handleMouseUp: MouseEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    setMoving(false)
  }

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
        top: 0,
        left: 0,
      }}
      style={{
        transform: `translate3d(${left}px, ${top}px, 0)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </Paper>
  )
}

export { CanvasItem as default }
