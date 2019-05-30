import React from 'react';
import '../styles/Main.css';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

class ErrorList extends React.Component{
    onClearErrors(){
        this.props.clearErrors();
    }
    render(){
        return(
            <Container maxWidth="md" style={{marginBottom:"20px"}}>
                <Paper style={{padding:"20px"}}>
                    <Typography color="secondary" variant="h6" align="center">Errors</Typography>  
                    <List className="listView" style={{marginTop:"10px"}}>
                        {this.props.errors.map((err,index) => (
                            <ListItem key={index}>
                                <Icon color="error">error</Icon>
                                <ListItemText classes={{primary:'error'}} primary={err} />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={this.onClearErrors.bind(this)} variant="contained" color="secondary">Close Errors</Button>
                </Paper>
            </Container>
        );
    }
}

export default ErrorList;