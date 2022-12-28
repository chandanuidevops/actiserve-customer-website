const {makeStyles} = require('@material-ui/core')
export const useStyles = makeStyles((theme) => ({
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white',
    },
    '&.MuiAccordion-root': {
      borderBottom: '1px solid rgba(33, 38, 43, 0.1)',
      borderRadius: '0px',
      marginBottom: '26px',
    },
    '&.MuiAccordionDetails-root': {
      padding: '20px',
    },
  },
  container: {
    maxWidth: '1170px',
    margin: '0 auto',
  },
  card: {
    padding: '20px 20px',
    maxWidth: '100%',
    margin: '0px  auto 0px auto',
    background: '#fff',


    border: '1px solid #e9e9e9',
  },
  cardContainer: {
    padding: '20px 20px',
    maxWidth: '100%',
    margin: '0px  auto 0px auto',
    background: '#fff',
    border: '1px solid #e9e9e9',
  },
  cardWrap: {
    gap: '30px',
    maxWidth: '100%',
    margin: '0px  auto 0px auto',
    [theme.breakpoints.up('768')]: {
      maxWidth: '50%',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '100%',
    
    },
  },
  cardWrapSm: {
    gap: '30px',
    maxWidth: '100%',
    margin: '0px  auto 0px auto',
    [theme.breakpoints.up('768')]: {
      maxWidth: '50%',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '60%',
    },
  },
  cardWrapLg: {
    gap: '30px',
    maxWidth: '100%',
    margin: '0px  auto 0px auto',
    [theme.breakpoints.up('768')]: {
      maxWidth: '70%',
    },
  },
  cardItem: {
    width: '100%',
    [theme.breakpoints.up('1024')]: {
      width: '100%',
    },
  },
  input: {
    marginTop: '.857rem',
    [theme.breakpoints.up('768')]: {
      marginTop: '1.571rem',
    },
  },
  postcodeInput: {
    paddingBottom: '10px',
  },
  cardItemPB: {
    marginBottom: '20px',
  },
  bntContainer: {
    [theme.breakpoints.down('767')]: {
      position: 'fixed',
      background: '#fff',
      padding: '10px 5px',
      bottom: '0',
      borderTop: '1px solid #e9e9e9',
      width: '100%',
      zIndex: '200',
    },
    [theme.breakpoints.up('768')]: {
      maxWidth: '100%',
      margin: '20px  auto 0px auto',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '100%',
    },
  },
  bntFullContainer: {
    display: 'flex',
    justifyContent: 'end',
    [theme.breakpoints.down('767')]: {
     
     
      padding: '10px 5px',
      bottom: '0',
      borderTop: '1px solid #e9e9e9',
    
      zIndex: '200',
    },
    [theme.breakpoints.up('768')]: {
      maxWidth: '100%',
      margin: '20px  auto 0px auto',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '100%',
      margin: '20px 0px 0px 0px',
    },
  },

  cardMargin: {
    marginTop:'20px',
    [theme.breakpoints.down('767')]: {
     
      marginTop:'10px',
    
    },

  },



  btnFlexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    [theme.breakpoints.down('767')]: {
      position: 'fixed',
      background: '#fff',
      padding: '10px 5px',
      bottom: '0',
      borderTop: '1px solid #e9e9e9',
      width: '100%',
      zIndex: '200',
    },
    [theme.breakpoints.up('768')]: {
      maxWidth: '50%',
      margin: '0px auto 0px auto',
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '40%',
    },
  },
  root: {
    '& .MuiButton-label': {
      padding: '13px',
    },
    '& .MuiInputLabel-formControl': {
      zIndex: 99,
    },
  },
  label: {
    '& .MuiButton-label': {
      padding: '13px',
    },
  },
  heading: {
    paddingLeft: '20px',
    textTransform: 'capitalize',
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#21262b',
    fontSize: '16px',
    lineHeight: '19px',
  },
  heading2: {
    fontSize: '16px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  heading3: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#21262b',
    fontSize: '14px',
    lineHeight: '18px',
    paddingTop: '6px',
    paddingBottom: '4px',
    margin: '0px',
  },
  selected: {
    maxHeight: '38px',
    minHeight: '38px',
    background: '#E5F2FF',
    borderRadius: '5px',
  },
  showBtn: {
    height: '30px',
    color: '#fff',
    background: '#3698ff',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  nextBtn: {
    background: '#e3e3e3',
    fontFamily: '"Urbanist", sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.07em',
    color: '#505050',
    padding: '4px 20px',
    borderRadius: '5px',
    maxHeight: '38px',
    minHeight: '38px',
    maxWidth: '150px',
    float: 'right',
    margin: 0,
  },
  btnimg: {
    width: '22px',
    height: '14px',
    marginLeft: '7px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#fff',
  },
  logoAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7),
  },
  header: {
    fontFamily: 'Mulish, sans-serif',
    color: '#101928',
    fontSize: '28px',
    fontWeight: '800',
    lineHeight: '36px',
    marginBottom: '1rem',
  },
  headerCaption: {
    color: '#878c93',
    fontFamily: 'Mulish, sans-serif',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '21px',
    marginBottom: '1rem',
  },
  content: {
    // position: 'absolute',
    // left: '50%',
    // top: '50%',
    // transform: 'translate(-50%, -50%)',
  },
  existText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    letterSpacing: '0.02em',
    color: '#353535',
    marginTop: '0.3rem !important',
  },
  paperHeading: {
    fontWeight: '700',
    color: '#1A273A',
  },
  mt20: {
    marginTop: '20px',
  },
  fileButton: {
    color: '#21262b',
    fontSize: '14px',
   
    height: '32px',
    maxWidth: '128px',
    fontWeight: 'bolder',
    borderRadius: '5px',
    '&::file-selector-button': {
      minWidth: '108px',
      // color: '#fff',
      // background: '#0587ff',
      // border: '1px solid #eef0f2',
      // textTransform: 'none',
      // boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
      // fontFamily: 'Urbanist',
      // fontWeight: '500',
 boxShadow: '0 4px 6px 0 rgb(16 25 40 / 0%)',
      padding: '8px 16px',
      minHeight: '38px',
      borderRadius: '5px',
      cursor: 'pointer',
      padding: '8px 18px',
      background: '#0587ff',
      fontFamily: 'Urbanist, sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      letterSpacing: '0.07em',
      color: '#ffffff',
      borderRadius: '5px',
      width: 'auto',
      margin:' 0',
        lineHeight:'12px',
    
     
      textTransform: 'none',
      boxShadow: '0 4px 6px 0 rgb(16 25 40 / 10%)',
   
   
      border:'0'




    },
  },
  textFieldName: {
    display: 'block',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '23px',
    color: '#333',
  },
  imageSection: {
    maxHeight: '100px',
    width: 'auto',
    overflow: 'hidden',
    maxWidth: '100%',
  },
  wordBreak: {
    wordBreak: 'break-all',
    display: 'flex',
    alignItems: 'flex-end',
  },
  postcodeContainer: {
    padding: '40px 0px 40px 0px',

    [theme.breakpoints.down('767')]: {
      padding: '20px 10px 20px 10px',
    },

  },
  docsCard: {
    background: '#fff',
    marginBottom: '20px',
    padding: '20px 20px',
  },
  [theme.breakpoints.up('1024')]: {
    maxWidth: '40%',
    padding: '2.714rem 2.429rem',
  },
  btnLgFlexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    [theme.breakpoints.down('767')]: {
      position: 'fixed',
      background: '#fff',
      padding: '10px 5px',
      bottom: '0',
      borderTop: '1px solid #e9e9e9',
      width: '100%',
      zIndex: '200',
    },
    [theme.breakpoints.up('768')]: {
      maxWidth: '70%',
      margin: '0px auto 0px auto',
      justifyContent: 'flex-end',
    },
  },
  btnSmFlexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    [theme.breakpoints.down('767')]: {
      position: 'fixed',
      background: '#fff',
      padding: '10px 5px',
      bottom: '0',
      borderTop: '1px solid #e9e9e9',
      width: '100%',
      zIndex: '200',
    },
    [theme.breakpoints.up('768')]: {
      maxWidth: '50%',
      margin: '0px auto 0px auto',
      justifyContent: 'flex-end',
    },
    [theme.breakpoints.up('1024')]: {
      maxWidth: '60%',
    },
  },
  postcodeCheckGrid: {
    minWidth: '33.3%',
    [theme.breakpoints.up('1024')]: {
      minWidth: '25% !important',
    },
  },
  fileNameText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#21262b',
    margin: 0,
  },
  modalinfo: {
    fontFamily: 'Urbanist,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.02em',
    color: '#353535',
  },
  completeText: {
    fontFamily: 'Urbanist__semibold,sans-serif',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '22px',
    color: '#21262b',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3rem',
    padding: '0rem 1rem',
    [theme.breakpoints.up('1024')]: {
      maxWidth: '55%',
    },
  },
  formMinHeight:{
    minHeight:'67vh',
    [theme.breakpoints.up('1200')]: {
      minHeight:'90vh',
    },
  }
}))
