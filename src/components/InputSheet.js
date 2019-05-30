import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import '../styles/Main.css';

class InputSheet extends React.Component{
    onValueChanged(e){
        this.props.onValueChanged(e.target.value);
    }
    submitAmount(){
        this.props.submitAmount();
    }
    enterKey(e){
        if(e.target.value === "") return;
        this.props.enterKey(e);
    }

    render(){
        return(
            <div style={{padding:"20px"}}>
                    <Container maxWidth="md">
                        <h2>Tokopedia Software Engineer Mobile/Web Test</h2>
                            <Grid container alignContent="center">
                                <Grid item xs={12}>
                                    <Paper style={{padding:"20px"}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={8}>
                                                <TextField
                                                id="outlined-adornment-amount"
                                                variant="outlined"
                                                label="Amount"
                                                fullWidth
                                                value={this.props.userValue}
                                                onChange={this.onValueChanged.bind(this)}
                                                onKeyPress={this.enterKey.bind(this)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Button size="large" variant="contained" color="primary" name="amount-submit" onClick={this.submitAmount.bind(this)}>
                                                    Submit Amount 
                                                    <Icon>money</Icon>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                    </Container>
                </div>
        );
    }
}

export default InputSheet;