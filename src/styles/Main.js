import {createMuiTheme,makeStyles} from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';

export const theme = createMuiTheme({
    palette:{
        primary:lightGreen,
    }
});

// export const useStyles = makeStyles(theme => ({
//     root:{
//         display:'flex',
//         flexWrap:'wrap'
//     },
//     h2:{
//         color:lightGreen
//     },

// }));
