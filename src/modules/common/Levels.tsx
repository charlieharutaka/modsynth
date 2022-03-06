import { Paper, Box } from '@mui/material'
import { amber, grey, lightGreen, red } from '@mui/material/colors'
import React, { FunctionComponent, useEffect, useState } from 'react'

type IndicatorProps = {
  on: boolean
  color: string
  positionX: number
  positionY: number
}

const DotIndicator: FunctionComponent<IndicatorProps> = ({
  on,
  color,
  positionX,
  positionY,
}) => {
  return (
    <Box
      sx={{
        width: '8px',
        height: '8px',
        borderRadius: '140px',
        position: 'absolute',
        top: positionY - 4,
        left: positionX - 4,
        transitionProperty: 'background-color',
        transitionTimingFunction: 'linear',
      }}
      style={{
        backgroundColor: on ? color : grey.A700,
        transitionDuration: on ? '1ms' : '1s',
      }}
    ></Box>
  )
}

type LevelsProps = {
  positionX: number
  positionY: number
  width?: number
  height?: number
  value: number
  variant?: 'dots' | 'bars'
}

const Levels: FunctionComponent<LevelsProps> = ({
  positionX,
  positionY,
  width = 40,
  height = 240,
  value,
  variant,
}) => {
  const [on, setOn] = useState(false)
  setTimeout(() => setOn(wasOn => !wasOn), 1000)
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: positionY,
        left: positionX,
        width,
        height,
        backgroundColor: 'black',
      }}
    >
      <DotIndicator on={on} color={red.A400} positionX={20} positionY={20} />
      <DotIndicator on={on} color={amber.A400} positionX={20} positionY={60} />
      <DotIndicator
        on={on}
        color={lightGreen.A400}
        positionX={20}
        positionY={100}
      />
      <DotIndicator
        on={on}
        color={lightGreen.A400}
        positionX={20}
        positionY={140}
      />
      <DotIndicator
        on={on}
        color={lightGreen.A400}
        positionX={20}
        positionY={180}
      />
      <DotIndicator
        on={on}
        color={lightGreen.A400}
        positionX={20}
        positionY={220}
      />
    </Paper>
  )
}

export { Levels as default }
