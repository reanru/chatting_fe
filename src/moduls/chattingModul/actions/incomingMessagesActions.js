import axios from 'axios'
import { API_ENDPOINT } from '../init/apiUrl'

import { 
    GET_LIST_FRIEND_REQUEST,
    GET_LIST_FRIEND_SUCCESS,
    GET_LIST_FRIEND_FAIL,
    GET_LIST_FRIEND_RESET
} from '../contants/incomingMessagesConstants';

export const getListFriend = () => async (dispatch, getState) => {
    try {
        dispatch({
            type : GET_LIST_FRIEND_REQUEST
        });

        const { login: {token} } = getState();

        const CONFIG = {
            headers : {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Authorization" : `${token}`
            },
        };

        const res = await axios
                    .get(API_ENDPOINT.GET_LIST_FRIEND, CONFIG);

        dispatch({
            type: GET_LIST_FRIEND_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : GET_LIST_FRIEND_FAIL,
            payload: message
        });
    }
}

export const resetGetListFriend = ()  => (dispatch) =>  {
    dispatch({
        type : GET_LIST_FRIEND_RESET
    });
}