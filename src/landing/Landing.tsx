import { Box, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'

import CanvasGrid from '../core/canvas/CanvasGrid'
import Canvas from '../core/canvas/Canvas'
import CanvasItem from '../core/canvas/CanvasItem'

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
        <CanvasItem
          width={220}
          height={220}
          initialPositionX={0}
          initialPositionY={0}
        >
          <Typography variant="h3">やはっろ</Typography>
        </CanvasItem>
      </Canvas>
    </Box>
  )
}

export { Landing as default }
