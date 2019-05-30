import * as types from './ActionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    amounts:undefined,
    userValue:"",
    pastValues:[],
    errors:[]
});

export default function reduce(state = initialState, action = {}){
    switch(action.type){
        case types.AMOUNT_FETCHED:
            return state.merge({
               amounts:action.amounts,
            });
        case types.AMOUNT_CHANGED:
            return state.merge({
                userValue:action.value,
            });
        case types.AMOUNT_SUBMIT:
            return state.merge({
                pastValues:action.result,
                userValue:"",
                errors:[]
            });
        case types.CLEAR_HISTORY:
            return state.merge({
                pastValues:[]
            });
        case types.ERROR:
            return state.merge({
                errors:action.errors
            });
        case types.CLEAR_ERRORS:
            return state.merge({
                errors:[]
            });
        default:
            return state;
    }
}

export function getAmounts(state){
    return state.Main.amounts;
}

export function getUserValue(state){
    return state.Main.userValue;
}

export function getPastValues(state){
    return state.Main.pastValues;
}

export function getErrors(state){
    return state.Main.errors;
}
