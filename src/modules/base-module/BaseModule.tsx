import { Paper, Typography } from '@mui/material'
import React, { FunctionComponent } from 'react'

const BaseModule: FunctionComponent = () => {
  return (
    <Paper>
      <Typography>Base Module</Typography>
    </Paper>
  )
}

export { BaseModule as default }
