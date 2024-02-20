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

export const getUserReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { loading: true};

        case GET_USER_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case GET_USER_FAIL:
            return { loading: false, error: action.payload };

        case GET_USER_RESET:
            return {};
        
        default:
            return state;
    }
}

export const logoutReducers = (state = {}, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { loading: true};

        case LOGOUT_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case LOGOUT_FAIL:
            return { loading: false, error: action.payload };

        case LOGOUT_RESET:
            return {};
        
        default:
            return state;
    }
}

export const sendCurrentMessageReducers = (state = {}, action) => {
    switch (action.type) {
        case SEND_CURRENT_MESSAGE_REQUEST:
            return { loading: true};

        case SEND_CURRENT_MESSAGE_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case SEND_CURRENT_MESSAGE_FAIL:
            return { loading: false, error: action.payload };

        case SEND_CURRENT_MESSAGE_RESET:
            return {};
        
        default:
            return state;
    }
}

export const selectFriendMessageReducers = (state = {}, action) => {
    switch (action.type) {
        case SELECT_FRIEND_MESSAGE_REQUEST:
            return { loading: true};

        case SELECT_FRIEND_MESSAGE_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case SELECT_FRIEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload };

        case SELECT_FRIEND_MESSAGE_RESET:
            return {};
        
        default:
            return state;
    }
}

export const searchUserReducers = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_USER_REQUEST:
            return { loading: true};

        case SEARCH_USER_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case SEARCH_USER_FAIL:
            return { loading: false, error: action.payload };

        case SEARCH_USER_RESET:
            return {};
        
        default:
            return state;
    }
}

export const sendFriendRequestReducers = (state = {}, action) => {
    switch (action.type) {
        case SEND_FRIEND_REQ_REQUEST:
            return { loading: true};

        case SEND_FRIEND_REQ_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case SEND_FRIEND_REQ_FAIL:
            return { loading: false, error: action.payload };

        case SEND_FRIEND_REQ_RESET:
            return {};
        
        default:
            return state;
    }
}

export const acceptFriendRequestReducers = (state = {}, action) => {
    switch (action.type) {
        case ACCEPT_FRIEND_REQ_REQUEST:
            return { loading: true};

        case ACCEPT_FRIEND_REQ_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case ACCEPT_FRIEND_REQ_FAIL:
            return { loading: false, error: action.payload };

        case ACCEPT_FRIEND_REQ_RESET:
            return {};
        
        default:
            return state;
    }
}

export const cancelFriendRequestReducers = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_FRIEND_REQ_REQUEST:
            return { loading: true};

        case CANCEL_FRIEND_REQ_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case CANCEL_FRIEND_REQ_FAIL:
            return { loading: false, error: action.payload };

        case CANCEL_FRIEND_REQ_RESET:
            return {};
        
        default:
            return state;
    }
}

export const removeFriendRequestReducers = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_FRIEND_REQ_REQUEST:
            return { loading: true};

        case REMOVE_FRIEND_REQ_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case REMOVE_FRIEND_REQ_FAIL:
            return { loading: false, error: action.payload };

        case REMOVE_FRIEND_REQ_RESET:
            return {};
        
        default:
            return state;
    }
}

export const getListFriendRequestReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_FRIEND_REQ_REQUEST:
            return { loading: true};

        case GET_LIST_FRIEND_REQ_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case GET_LIST_FRIEND_REQ_FAIL:
            return { loading: false, error: action.payload };

        case GET_LIST_FRIEND_REQ_RESET:
            return {};
        
        default:
            return state;
    }
}