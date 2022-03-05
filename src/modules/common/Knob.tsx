import { Box, Paper, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useAtom } from 'jotai'
import _ from 'lodash'
import React, {
  FunctionComponent,
  PointerEventHandler,
  useEffect,
  useState,
} from 'react'
import * as CanvasState from '../../core/canvas/CanvasState'

type KnobProps = {
  positionX: number
  positionY: number
  minValue: number
  maxValue: number
  defaultValue?: number
  width?: number
  height?: number
  label?: string
  onChange?: (value: number) => void
}

const Knob: FunctionComponent<KnobProps> = ({
  positionX,
  positionY,
  minValue,
  maxValue,
  defaultValue = (maxValue + minValue) / 2,
  width = 140,
  height = 150,
  label,
  onChange,
}) => {
  const [updateRate] = useAtom(CanvasState.updateRate)
  const [rotation, setRotation] = useState(0)

  const getHandlePointerMove = (initialRotation: number, initialY: number) =>
    _.throttle(
      (event: PointerEvent): void => {
        event.preventDefault()
        event.stopPropagation()
        const newRotation = initialRotation + (event.clientY - initialY) / -2.5
        if (newRotation < -145) {
          setRotation(-145)
        } else if (newRotation > 145) {
          setRotation(145)
        } else {
          setRotation(newRotation)
        }
      },
      1000 / updateRate,
      { leading: true }
    )

  const handlePointerDown: PointerEventHandler = event => {
    event.preventDefault()
    event.stopPropagation()
    const handlePointerMove = getHandlePointerMove(rotation, event.clientY)
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener(
      'pointerup',
      () => {
        document.removeEventListener('pointermove', handlePointerMove)
        handlePointerMove.flush()
      },
      {
        once: true,
      }
    )
  }

  useEffect(
    () =>
      onChange?.(((rotation + 145) / 290) * (maxValue - minValue) + minValue),
    [rotation, onChange]
  )

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
      onPointerDown={handlePointerDown}
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
      <Box
        sx={{
          position: 'absolute',
          width: '2px',
          height: '60px',
          backgroundColor: blueGrey[200],
          transformOrigin: 'bottom center',
          transform: 'rotate(145deg)',
          left: '70px',
          bottom: '60px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '2px',
          height: '60px',
          backgroundColor: blueGrey[200],
          transformOrigin: 'bottom center',
          transform: 'rotate(-145deg)',
          left: '70px',
          bottom: '60px',
        }}
      />
      <Paper
        sx={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '140px',
          backgroundImage: 'linear-gradient(to bottom, #888, #222)',
          bottom: '10px',
          left: '20px',
        }}
        elevation={6}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '96px',
            height: '96px',
            borderRadius: '140px',
            backgroundColor: 'black',
            top: '2px',
            left: '2px',
          }}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '4px',
              height: '48px',
              borderRadius: '140px',
              backgroundColor: 'white',
              top: '2px',
              left: '46px',
            }}
          ></Box>
        </Box>
      </Paper>
    </Paper>
  )
}

export { Knob as default }
