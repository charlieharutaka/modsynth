import { Box, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'

import CanvasGrid from '../core/canvas/CanvasGrid'
import Canvas from '../core/canvas/Canvas'
import Panel from '../modules/common/Panel'
import Plug from '../modules/common/Socket'
import Knob from '../modules/common/Knob'

const Landing: FunctionComponent = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
      }}
    >
      <Canvas>
        <CanvasGrid gridSpacingX={240} gridSpacingY={240} />
        <Panel widthUnits={1} heightUnits={2}>
          <Knob
            label="Level"
            positionX={110}
            positionY={250}
            minValue={0}
            maxValue={1}
            onChange={value => console.log(value)}
          />
          <Plug label="L/Mon" positionX={70} positionY={390} />
          <Plug label="Right" positionX={150} positionY={390} />
        </Panel>
      </Canvas>
    </Box>
  )
}

export { Landing as default }
