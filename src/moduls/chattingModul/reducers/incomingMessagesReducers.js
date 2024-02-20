import {
    GET_LIST_FRIEND_REQUEST,
    GET_LIST_FRIEND_SUCCESS,
    GET_LIST_FRIEND_FAIL,
    GET_LIST_FRIEND_RESET
} from '../contants/incomingMessagesConstants';

export const getListFriendReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_LIST_FRIEND_REQUEST:
            return { loading: true};

        case GET_LIST_FRIEND_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case GET_LIST_FRIEND_FAIL:
            return { loading: false, error: action.payload };

        case GET_LIST_FRIEND_RESET:
            return {};
        
        default:
            return state;
    }
}