import axios from 'axios'
import { API_ENDPOINT } from '../init/apiUrl'

import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET
} from '../constants/loginConstants';

export const login = () => async (dispatch, getState) => {
    try {
        dispatch({
            type : LOGIN_REQUEST
        });

        const CONFIG = {
            headers : {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "App-ID" : "Sobat-Curhat-Artofsomething",
                // "Authorization" : `Bearer ${token}`
            },
        };
        
        const res = await axios
                    .get(API_ENDPOINT.GET_USER(), CONFIG);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : LOGIN_FAIL,
            payload: message
        });
    }
}

export const resetLogin = ()  => (dispatch) =>  {
    dispatch({
        type : LOGIN_RESET
    });
}