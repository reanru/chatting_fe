import axios from 'axios'
import { API_ENDPOINT } from '../init/apiUrl'

import { 
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_RESET
} from '../constants/registerConstants';

export const register = (data) => async (dispatch) => {
    try {
        dispatch({
            type : REGISTER_REQUEST
        });

        const CONFIG = {
            headers : {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
            },
        };
        
        console.log('testing 2 ', data);

        const res = await axios
                    .post(API_ENDPOINT.REGISTER, data, CONFIG);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : REGISTER_FAIL,
            payload: message
        });
    }
}

export const resetRegister = ()  => (dispatch) =>  {
    dispatch({
        type : REGISTER_RESET
    });
}