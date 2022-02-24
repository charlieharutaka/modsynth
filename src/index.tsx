import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom'

import Landing from './landing/Landing'

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: 'Poppins',
    },
    h2: {
      fontFamily: 'Poppins',
    },
    h3: {
      fontFamily: 'Poppins',
    },
    h4: {
      fontFamily: 'Poppins',
    },
    h5: {
      fontFamily: 'Poppins',
    },
    h6: {
      fontFamily: 'Poppins',
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Landing />
  </ThemeProvider>,
  document.getElementById('main')
)
