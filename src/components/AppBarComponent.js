import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {theme} from '../styles/Main';

class AppBarComponent extends React.Component{
    render(){
        return(
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h5">
                                Kennedy Lie
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </div>
        )
    }
}

export default AppBarComponent;