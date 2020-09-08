import { Theme, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';


export default withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
    //   fontWeight: 'bold',
    //   fontSize: 'large',
      backgroundColor: green[500],
      width: '100%',
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);