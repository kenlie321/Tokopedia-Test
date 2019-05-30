import React from 'react';
import '../styles/Main.css';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

class HistoryList extends React.Component{
    clearHistory(){
        this.props.clearHistory();
    }
    render(){
        return(
            <Container maxWidth="md">
                <Paper style={{padding:"20px"}}>  
                    <Button variant="contained" onClick={this.clearHistory.bind(this)} color="secondary">Clear History</Button>
                    <List className="listView" style={{marginTop:"10px"}}>
                        {this.props.pastValues.map((value,index) => (
                            <ListItem key={index}>
                                <ListItemText primary={value} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Container>
        );
    }
}

export default HistoryList;