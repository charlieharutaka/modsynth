import { Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import React, { FunctionComponent } from 'react'
import Knob from './common/Knob'
import Levels from './common/Levels'
import Panel from './common/Panel'
import Socket from './common/Socket'

const Output: FunctionComponent = () => {
  return (
    <Panel widthUnits={1} heightUnits={3}>
      <Typography
        variant="h4"
        color={blueGrey[200]}
        sx={{ position: 'absolute', top: 50, transform: 'translate(0, -50%)' }}
      >
        Output
      </Typography>
      <Levels positionX={40} positionY={100} value={0} />
      <Levels positionX={140} positionY={100} value={0} />
      <Typography
        sx={{
          position: 'absolute',
          top: 120,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
        variant="button"
      >
        0
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 160,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
      >
        -3
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 200,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
      >
        -6
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 240,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
      >
        -12
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 280,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
      >
        -24
      </Typography>
      <Typography
        sx={{
          position: 'absolute',
          top: 320,
          color: blueGrey[200],
          transform: 'translate(0, -50%)',
        }}
      >
        -36
      </Typography>
      <Knob
        label="Level"
        positionX={110}
        positionY={460}
        defaultValue={0}
        minValue={0}
        maxValue={1}
        onChange={value => console.log(value)}
        numSteps={16}
      />
      <Socket label="L/Mon" positionX={70} positionY={630} />
      <Socket label="Right" positionX={150} positionY={630} />
    </Panel>
  )
}

export { Output as default }
