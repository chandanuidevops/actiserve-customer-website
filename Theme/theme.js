import {createMuiTheme} from '@material-ui/core/styles'
import {red} from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3698FF',
    },
    secondary: {
      main: '#2A2A2A',
    },
    error: {
      main: '#DB4A40',
    },
    background: {
      default: 'rgba(255, 0, 0, 0)',
    },
  },
})

export default theme
