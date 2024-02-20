import axios from 'axios'
import { API_ENDPOINT } from '../init/apiUrl'

import { 
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GET_USER_RESET,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_RESET,

    SEND_CURRENT_MESSAGE_REQUEST,
    SEND_CURRENT_MESSAGE_SUCCESS,
    SEND_CURRENT_MESSAGE_FAIL,
    SEND_CURRENT_MESSAGE_RESET,

    SELECT_FRIEND_MESSAGE_REQUEST,
    SELECT_FRIEND_MESSAGE_SUCCESS,
    SELECT_FRIEND_MESSAGE_FAIL,
    SELECT_FRIEND_MESSAGE_RESET,

    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    SEARCH_USER_RESET,

    SEND_FRIEND_REQ_REQUEST,
    SEND_FRIEND_REQ_SUCCESS,
    SEND_FRIEND_REQ_FAIL,
    SEND_FRIEND_REQ_RESET,

    ACCEPT_FRIEND_REQ_REQUEST,
    ACCEPT_FRIEND_REQ_SUCCESS,
    ACCEPT_FRIEND_REQ_FAIL,
    ACCEPT_FRIEND_REQ_RESET,

    CANCEL_FRIEND_REQ_REQUEST,
    CANCEL_FRIEND_REQ_SUCCESS,
    CANCEL_FRIEND_REQ_FAIL,
    CANCEL_FRIEND_REQ_RESET,

    REMOVE_FRIEND_REQ_REQUEST,
    REMOVE_FRIEND_REQ_SUCCESS,
    REMOVE_FRIEND_REQ_FAIL,
    REMOVE_FRIEND_REQ_RESET,

    GET_LIST_FRIEND_REQ_REQUEST,
    GET_LIST_FRIEND_REQ_SUCCESS,
    GET_LIST_FRIEND_REQ_FAIL,
    GET_LIST_FRIEND_REQ_RESET
} from '../contants/chattingConstants';

export const getUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type : GET_USER_REQUEST
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
                    .get(API_ENDPOINT.GET_USER(), CONFIG);

        dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : GET_USER_FAIL,
            payload: message
        });
    }
}

export const resetGetUser = ()  => (dispatch) =>  {
    dispatch({
        type : GET_USER_RESET
    });
}

export const logout = () => async (dispatch, getState) => {
    try {
        dispatch({
            type : LOGOUT_REQUEST
        });

        const { login: {token} } = getState();

        const CONFIG = {
            headers : {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin" : "*",
                "Authorization" : `${token}`
            },
        };
        
        console.log('testing logout', token);
        const res = await axios
                    .delete(API_ENDPOINT.LOGOUT, CONFIG);
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : LOGOUT_FAIL,
            payload: message
        });
    }
}

export const sendCurrentMessage = (data) => async (dispatch) => {
    try {
        dispatch({
            type : SEND_CURRENT_MESSAGE_REQUEST
        });

        dispatch({
            type: SEND_CURRENT_MESSAGE_SUCCESS,
            payload: data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : SEND_CURRENT_MESSAGE_FAIL,
            payload: message
        });
    }
}

export const selectFriendMessage = (data) => async (dispatch) => {
    try {
        dispatch({
            type : SELECT_FRIEND_MESSAGE_REQUEST
        });

        dispatch({
            type: SELECT_FRIEND_MESSAGE_SUCCESS,
            payload: data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : SELECT_FRIEND_MESSAGE_FAIL,
            payload: message
        });
    }
}

export const searchUser = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type : SEARCH_USER_REQUEST
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
                    .get(API_ENDPOINT.SEARCH_USER(1, 10, data), CONFIG);

        dispatch({
            type: SEARCH_USER_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : SEARCH_USER_FAIL,
            payload: message
        });
    }
}

export const resetSearchUser = ()  => (dispatch) =>  {
    dispatch({
        type : SEARCH_USER_RESET
    });
}

export const sendFriendRequest = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type : SEND_FRIEND_REQ_REQUEST
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
                    .post(API_ENDPOINT.SEND_FRIEND_REQUEST, data, CONFIG);

        dispatch({
            type: SEND_FRIEND_REQ_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : SEND_FRIEND_REQ_FAIL,
            payload: message
        });
    }
}

export const resetSendFriendRequest = ()  => (dispatch) =>  {
    dispatch({
        type : SEND_FRIEND_REQ_RESET
    });
}

export const acceptFriendRequest = (friendRequestId) => async (dispatch, getState) => {
    try {
        dispatch({
            type : ACCEPT_FRIEND_REQ_REQUEST
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
                    .put(API_ENDPOINT.ACCEPT_FRIEND_REQUEST(friendRequestId), {}, CONFIG);

        dispatch({
            type: ACCEPT_FRIEND_REQ_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : ACCEPT_FRIEND_REQ_FAIL,
            payload: message
        });
    }
}

export const resetAcceptFriendRequest = ()  => (dispatch) =>  {
    dispatch({
        type : ACCEPT_FRIEND_REQ_RESET
    });
}

export const cancelFriendRequest = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type : CANCEL_FRIEND_REQ_REQUEST
        });

        const { login: {token} } = getState();

        const headers = {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Authorization" : `${token}`
        }

        const res = await axios
                    .delete(API_ENDPOINT.CANCEL_FRIEND_REQUEST, { headers: headers, data: data } );

        dispatch({
            type: CANCEL_FRIEND_REQ_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : CANCEL_FRIEND_REQ_FAIL,
            payload: message
        });
    }
}

export const resetCancelFriendRequest = ()  => (dispatch) =>  {
    dispatch({
        type : CANCEL_FRIEND_REQ_RESET
    });
}

export const removeFriendRequest = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type : REMOVE_FRIEND_REQ_REQUEST
        });

        const { login: {token} } = getState();

        const headers = {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Authorization" : `${token}`
        }

        const res = await axios
                    .delete(API_ENDPOINT.REMOVE_FRIEND_REQUEST, { headers: headers, data: data } );

        dispatch({
            type: REMOVE_FRIEND_REQ_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : REMOVE_FRIEND_REQ_FAIL,
            payload: message
        });
    }
}

export const resetRemoveFriendRequest = ()  => (dispatch) =>  {
    dispatch({
        type : REMOVE_FRIEND_REQ_RESET
    });
}

export const getListFriendRequest = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type : GET_LIST_FRIEND_REQ_REQUEST
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
                    .get(API_ENDPOINT.GET_LIST_FRIEND_REQUEST, CONFIG);

        dispatch({
            type: GET_LIST_FRIEND_REQ_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type : GET_LIST_FRIEND_REQ_FAIL,
            payload: message
        });
    }
}

export const resetGetListFriendRequest = ()  => (dispatch) =>  {
    dispatch({
        type : GET_LIST_FRIEND_REQ_RESET
    });
}