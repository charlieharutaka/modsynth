import { Box } from '@mui/system'
import { Provider, useAtom } from 'jotai'
import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react'

import * as CanvasState from './CanvasState'

type CanvasProps = {}

const RawCanvas: FunctionComponent<CanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [positionX, setX] = useAtom(CanvasState.positionX)
  const [positionY, setY] = useAtom(CanvasState.positionY)
  const [zoomRatio, setZoom] = useAtom(CanvasState.zoomRatio)
  const [, setViewWidth] = useAtom(CanvasState.viewWidth)
  const [, setViewHeight] = useAtom(CanvasState.viewHeight)

  const [moving, setMoving] = useState(false)
  const [initialX, setInitialX] = useState(0)
  const [initialY, setInitialY] = useState(0)

  useEffect(() => {
    setViewWidth(canvasRef.current?.clientWidth ?? 0)
    setViewHeight(canvasRef.current?.clientHeight ?? 0)
  }, [canvasRef.current?.clientWidth, canvasRef.current?.clientHeight])

  const handleMouseMove: MouseEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    if (!moving) return

    setX(event.clientX - initialX)
    setY(event.clientY - initialY)
  }
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
  const handleWheel: WheelEventHandler = event => {
    const newZoomRatio = zoomRatio + event.deltaY * 1e-2
    if (newZoomRatio > 0) {
      setZoom(zoomRatio + event.deltaY * 1e-2)
    }
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
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {children}
    </Box>
  )
}

const Canvas: FunctionComponent<CanvasProps> = ({ children, ...props }) => (
  <Provider>
    <RawCanvas {...props}>{children}</RawCanvas>
  </Provider>
)

export { Canvas as default, RawCanvas as CanvasWithoutProvider }
