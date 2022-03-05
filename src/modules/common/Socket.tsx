import { Box, Paper, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import React, { FunctionComponent } from 'react'

type SocketProps = {
  width?: number
  height?: number
  positionX: number
  positionY: number
  label?: string
  socketId?: symbol
}

const Socket: FunctionComponent<SocketProps> = ({
  width = 60,
  height = 90,
  positionX,
  positionY,
  label,
  socketId = Symbol(label),
}) => {
  return (
    <Paper
      sx={{
        position: 'absolute',
        width,
        height,
        top: positionY - height / 2,
        left: positionX - width / 2,
        backgroundColor: blueGrey[50],
        borderWidth: '2px',
        borderColor: blueGrey[200],
      }}
      onPointerDown={event => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onPointerUp={event => {
        console.log(socketId)
      }}
      variant="outlined"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '40px',
        }}
      >
        <Typography variant="button" color={blueGrey[200]}>
          {label}
        </Typography>
      </Box>
      <Paper
        sx={{
          width: '40px',
          height: '40px',
          borderRadius: '140px',
          backgroundImage: 'linear-gradient(to bottom, #aaa, #999, #777)',
          position: 'absolute',
          left: '10px',
          bottom: '10px',
        }}
        elevation={4}
      >
        <Box
          sx={{
            width: '36px',
            height: '36px',
            borderRadius: '140px',
            backgroundImage: 'linear-gradient(to bottom, #eee, #ccc)',
            position: 'absolute',
            left: '2px',
            top: '2px',
          }}
        >
          <Box
            sx={{
              width: '28px',
              height: '28px',
              borderRadius: '140px',
              backgroundImage: 'linear-gradient(to bottom, #aaa, #888)',
              position: 'absolute',
              left: '4px',
              top: '4px',
            }}
          >
            <Box
              sx={{
                width: '24px',
                height: '24px',
                borderRadius: '140px',
                backgroundColor: 'black',
                position: 'absolute',
                left: '2px',
                top: '2px',
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Paper>
  )
}

export { Socket as default }
