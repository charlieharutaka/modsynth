import { Box, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'

import CanvasGrid from '../core/components/CanvasGrid'
import Canvas from '../core/components/Canvas'
import CanvasItem from '../core/components/CanvasItem'

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
        <CanvasItem width={240} height={240} initialX={240} initialY={240}>
          <Typography variant="h1">XD</Typography>
        </CanvasItem>
      </Canvas>
    </Box>
  )
}

export { Landing as default }
