import React from 'react';
import '../styles/Main.css';
import { connect } from 'react-redux';
import * as actions from '../stores/Main/Action';
import * as selectors from '../stores/Main/Reducer';

import AppBarComponent from '../components/AppBarComponent';
import InputSheet from '../components/InputSheet';
import HistoryList from '../components/HistoryList';
import ErrorList from '../components/ErrorList';

class Main extends React.Component{
    componentDidMount(){
        this.props.loadAmounts();
    }

    render(){ 
        if(!this.props.amounts) return this.renderLoading();
        return(
            <div id="home">
                <AppBarComponent />
                <InputSheet 
                    userValue={this.props.userValue}
                    onValueChanged={this.onValueChanged.bind(this)}
                    submitAmount={this.onSubmitAmount.bind(this)}
                    enterKey={this.onEnterKey.bind(this)}
                />
                {this.props.errors.length === 0 ? <div/> : <ErrorList errors={this.props.errors} clearErrors={this.onClearErrors.bind(this)}/>}
                {this.props.pastValues.length === 0 ? <div></div> : <HistoryList pastValues={this.props.pastValues} clearHistory={this.onClearHistory.bind(this)}/>}
                {/* <button onClick={this.onCheckAmount.bind(this)}>?</button> */}
            </div>
        );
    }

    renderLoading(){
        return(
            <p>Loading...</p>
        );
    }
    // Functions to be Passed Down
    onValueChanged(value){
        this.props.changeAmount(value);
    }
    onSubmitAmount(){
        //Check Errors
        this.props.submitAmount();
    }
    onClearHistory(){
        this.props.clearHistory();
    }
    onClearErrors(){
        this.props.clearErrors();
    }
    onEnterKey(e){
        if(e.charCode === 13){
            this.props.submitAmount();
        }
    }
    // onCheckAmount(){
    //     console.log(this.props);
    // }
}

function mapStateToProps(state){
    return {
        amounts:selectors.getAmounts(state),
        userValue:selectors.getUserValue(state),
        pastValues:selectors.getPastValues(state),
        errors:selectors.getErrors(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadAmounts() {
            dispatch(actions.fetchAmounts())
        },
        changeAmount(value){
            dispatch(actions.changeAmount(value));
        },
        submitAmount(){
            dispatch(actions.submitAmount());
        },
        clearHistory(){
            dispatch(actions.clearHistory());
        },
        clearErrors(){
            dispatch(actions.clearErrors());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)