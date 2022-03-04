import _ from 'lodash'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import React, {
  FunctionComponent,
  PointerEventHandler,
  useEffect,
  useRef,
} from 'react'

import * as CanvasState from './CanvasState'

type CanvasProps = {}

const Canvas: FunctionComponent<CanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [positionX, setX] = useAtom(CanvasState.positionX)
  const [positionY, setY] = useAtom(CanvasState.positionY)
  const [, setWidth] = useAtom(CanvasState.canvasWidth)
  const [, setHeight] = useAtom(CanvasState.canvasHeight)
  const [updateRate] = useAtom(CanvasState.updateRate)

  useEffect(() => {
    setWidth(canvasRef.current?.clientWidth ?? 0)
    setHeight(canvasRef.current?.clientHeight ?? 0)
  }, [
    canvasRef.current?.clientWidth,
    canvasRef.current?.clientHeight,
    setWidth,
    setHeight,
  ])

  const getHandlePointerMove = (initialX: number, initialY: number) =>
    _.throttle((event: PointerEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      _.defer(() => {
        setX(event.clientX - initialX)
        setY(event.clientY - initialY)
      })
    }, 1000 / updateRate)

  const handleMouseDown: PointerEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    const handlePointerMove = getHandlePointerMove(
      event.clientX - positionX,
      event.clientY - positionY
    )
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener(
      'pointerup',
      () => document.removeEventListener('pointermove', handlePointerMove),
      {
        once: true,
      }
    )
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'block',
        position: 'static',
        overflow: 'hidden',
        top: 0,
        left: 0,
      }}
      ref={canvasRef}
      onPointerDown={handleMouseDown}
    >
      {children}
    </Box>
  )
}

export { Canvas as default }
