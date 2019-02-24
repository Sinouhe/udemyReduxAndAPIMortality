import {GET_COUNTRY,ERROR_GET_COUNTRIES} from '../actions/index';

export default function (state=null, action) {
    switch(action.type){
        case GET_COUNTRY :
            return action.payload;
        case ERROR_GET_COUNTRIES :
            return action.error
    }
    return state;
}