const {makeStyles} = require('@material-ui/core')
export const useStyles = makeStyles((theme) => ({
  MuiAccordionroot: {
    '&.MuiAccordion-root': {
      marginBottom: '8px',
      padding: '10px 0px 10px 10px',
    },
    '&.MuiAccordionDetails-root': {
      padding: '0px',
    },
    '&.MuiAccordionSummary-content.Mui-expanded': {
      padding: '0px',
    },
    // '&.MuiAccordionSummary-content': {
    //   margin: '0px',
    //   padding: '32px',
    // },
  },
  MuiAccordionSummary: {
    '&.MuiAccordionSummary-content': {
      margin: '0px',
    },
  },
}))
