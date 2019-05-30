import _ from 'lodash';
import * as types from './ActionTypes';
import { getAmounts } from '../../services/Amount';
import * as selectors from '../Main/Reducer';

//GetAmounts For Checking
export function fetchAmounts(){
    return dispatch => {
        const amounts = getAmounts();
        dispatch({type:types.AMOUNT_FETCHED,amounts});
    }
}

export function changeAmount(value){
    return dispatch => {
        dispatch({type:types.AMOUNT_CHANGED,value:value});
    }
}
//Primary Function
export function submitAmount(){
    return (dispatch,getState) => {
        //Get States
        const amounts = selectors.getAmounts(getState());
        const value = selectors.getUserValue(getState());
        var pastValues = selectors.getPastValues(getState());

        //Define necessary Variables
        let result = [];
        let validatedValue = validateString(value);
        if(validatedValue.error !== ""){
            return dispatch(pushError(validatedValue.error));
        }
        let valueToChange = validatedValue.value;
        //console.log(valueToChange);
        let finalResult = value + " = ";
        let y = 0;
        
        for(let i = 0; i <= amounts.length; i++){
            //Check leftover value
            if(i === amounts.length){
                if(valueToChange !== 0){
                    result.push({amount:valueToChange,count:1});
                }
            }else{
                y = Math.floor(valueToChange / amounts[i]);
                if(y === 0){}
                else{
                    result.push({amount:amounts[i],count:y});
                }
                valueToChange = valueToChange % amounts[i];
            }
        }
        //console.log(result);
        //Create Text Statement
        for(let h = 0;h < result.length; h++){
            let txt = result[h];
            console.log(txt);
            if(amounts.indexOf(txt.amount) === -1){
                console.log("test");
                finalResult += " Left " + txt.count + "x Rp" + txt.amount + " ";    
            }else{
                finalResult += txt.count + "x Rp" + txt.amount + " ";
            }
        }
        //Concat Array for immutability
        let tempArray = [];
        tempArray.push(finalResult);
        let arrayToBeSent = pastValues.concat(tempArray);
        dispatch({type:types.AMOUNT_SUBMIT,result:arrayToBeSent});
    }
}

export function clearHistory(){
    return dispatch => {
        dispatch({type:types.CLEAR_HISTORY});
    }
}

export function clearErrors(){
    return dispatch => {
        dispatch({type:types.CLEAR_ERRORS});
    }
}

function pushError(err){
    return (dispatch,getState) =>{
        console.log('test');
        //var errors = selectors.getErrors(getState());
        let tempArray = []
        tempArray.push(err);
        let arrayToBeSent = tempArray;
        dispatch({type:types.ERROR,errors:arrayToBeSent});
    }
}

//Parsing & Validation for Value String
function validateString(text){
    //Validate Empty String
    if(text === "") return {error:"Input is Empty"};
    
    let strInput = text;
    let txt,x,y,z,res1,res2,res3,res4;
    x = strInput.indexOf(strInput.match(/[1-9]/));
    
    //Validate Empty String with Rp / String with Rp
    if(x === -1) return {error:"Value is Empty/Invalid"};

    //Validate invalid Rp currency format
    txt = strInput.slice(0,strInput.indexOf(strInput.match(/[1-9]/)));
    txt.trim();
    let checkTxt = txt.match(new RegExp("rp","i"));
    if(checkTxt === null) return {error:"Invalid Currency Format. Please Start with Rp"};

    res1 = strInput.slice(x);
    y = res1.indexOf(res1.match(/[^0-9.,]\S+/));
    //Validate Whitespaces
    if(y !== -1) return {error:"Format is Invalid. Valid Format e.g Rp10.000,00"};

    res2 = y === -1 ? res1.slice(0) : res1.slice(0,y);
    res3 = res2.replace(/\./g,"");

    z = res3.slice(res3.indexOf(","));
    //Validate invalid , Separator
    if(z.length > 3) return {error:"Invalid Separator for Amount. Use . Instead"};

    z = res3.indexOf(",00");
    res4 = z === -1 ? res3.slice(0) : res3.slice(0,res3.indexOf(",00"));
    //console.log(parseInt(res3));
    return {value:parseInt(res4,10),error:""};
}