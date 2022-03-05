import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import React, { FunctionComponent } from 'react'
import * as CanvasState from './CanvasState'

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

  const backgroundPositionX = positionX + canvasWidth / 2 + gridSpacingX / 2
  const backgroundPositionY = positionY + canvasHeight / 2 + gridSpacingY / 2

  return (
    <Box
      sx={{
        width: canvasWidth,
        height: canvasHeight,
        backgroundSize: `${gridSpacingX}px ${gridSpacingY}px`,
        backgroundImage: `
          radial-gradient(circle, #eee 2px, transparent 1px),
          linear-gradient(to right, #eee 2px, transparent 1px),
          linear-gradient(to bottom, #eee 2px, transparent 1px)`,
      }}
      style={{
        backgroundPositionX,
        backgroundPositionY,
      }}
    />
  )
}

export { CanvasGrid as default }
