import { GET_MESSAGE } from "../actions/types";

const initialState = {
    message: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_MESSAGE:
           return{
               message: action.payload
           }
        default:
            return state
    }
}