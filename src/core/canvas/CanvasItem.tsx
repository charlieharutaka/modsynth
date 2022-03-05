import _ from 'lodash'
import { Paper } from '@mui/material'
import { useAtom } from 'jotai'
import React, {
  FunctionComponent,
  PointerEventHandler,
  useEffect,
  useState,
} from 'react'
import * as CanvasState from './CanvasState'

type CanvasItemProps = {
  width?: number
  height?: number
  initialPositionX?: number
  initialPositionY?: number
  snapToX?: number
  snapToY?: number
  snapOffsetX?: number
  snapOffsetY?: number
  color?: string
  border?: string
}

const CanvasItem: FunctionComponent<CanvasItemProps> = ({
  children,
  width = 120,
  height = 120,
  initialPositionX = 0,
  initialPositionY = 0,
  snapToX,
  snapToY,
  snapOffsetX = 0,
  snapOffsetY = 0,
  color = null,
  border = null,
}) => {
  const [canvasPositionX] = useAtom(CanvasState.positionX)
  const [canvasPositionY] = useAtom(CanvasState.positionY)
  const [canvasWidth] = useAtom(CanvasState.canvasWidth)
  const [canvasHeight] = useAtom(CanvasState.canvasHeight)
  const [updateRate] = useAtom(CanvasState.updateRate)

  const [positionX, setPositionX] = useState(initialPositionX)
  const [positionY, setPositionY] = useState(initialPositionY)
  const [elevation, setElevation] = useState(3)

  const left = canvasWidth / 2 + canvasPositionX - width / 2 + positionX
  const top = canvasHeight / 2 + canvasPositionY - height / 2 + positionY

  const snapPosition = () => {
    if (snapToX) {
      setPositionX(
        x => Math.round((x - snapOffsetX) / snapToX) * snapToX + snapOffsetX
      )
    }
    if (snapToY) {
      setPositionY(
        y => Math.round((y - snapOffsetY) / snapToY) * snapToY + snapOffsetY
      )
    }
  }

  const getHandlePointerMove = (initialX: number, initialY: number) =>
    _.throttle(
      (event: PointerEvent): void => {
        event.preventDefault()
        event.stopPropagation()
        setPositionX(event.clientX - initialX)
        setPositionY(event.clientY - initialY)
      },
      1000 / updateRate,
      { leading: true }
    )

  const handlePointerDown: PointerEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    setElevation(8)

    const handlePointerMove = getHandlePointerMove(
      event.clientX - positionX,
      event.clientY - positionY
    )
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener(
      'pointerup',
      () => {
        document.removeEventListener('pointermove', handlePointerMove)
        handlePointerMove.flush()
        snapPosition()
        setElevation(3)
      },
      {
        once: true,
      }
    )
  }

  useEffect(() => snapPosition(), [])

  return (
    <Paper
      elevation={elevation}
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
        backgroundColor: color,
        border,
      }}
      style={{
        transform: `translate(${left}px, ${top}px)`,
      }}
      onPointerDown={handlePointerDown}
    >
      {children}
    </Paper>
  )
}

export { CanvasItem as default }
