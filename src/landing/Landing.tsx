import { Box, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'

import CanvasGrid from '../core/canvas/CanvasGrid'
import Canvas from '../core/canvas/Canvas'
import Output from '../modules/Output'

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
        <Output />
      </Canvas>
    </Box>
  )
}

export { Landing as default }
