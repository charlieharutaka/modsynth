import { blueGrey } from '@mui/material/colors'
import React, { FunctionComponent } from 'react'
import CanvasItem from '../../core/canvas/CanvasItem'
import * as Units from './Units'

type PanelProps = {
  widthUnits: number
  heightUnits: number
  initialX?: number
  initialY?: number
}

const Panel: FunctionComponent<PanelProps> = ({
  children,
  widthUnits,
  heightUnits,
  initialX = 0,
  initialY = 0,
}) => {
  const snapOffsetX = widthUnits % 2 === 0 ? Units.UnitSize / 2 : 0
  const snapOffsetY = heightUnits % 2 === 0 ? Units.UnitSize / 2 : 0
  return (
    <CanvasItem
      width={Units.getPx(widthUnits)}
      height={Units.getPx(heightUnits)}
      initialPositionX={initialX}
      initialPositionY={initialY}
      snapToX={Units.UnitSize}
      snapToY={Units.UnitSize}
      snapOffsetX={snapOffsetX}
      snapOffsetY={snapOffsetY}
      color={blueGrey[50]}
    >
      {children}
    </CanvasItem>
  )
}

export { Panel as default }
