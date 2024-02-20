import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_RESET,
} from '../constants/loginConstants';

export const loginReducers = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true};

        case LOGIN_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case LOGIN_FAIL:
            return { loading: false, error: action.payload };

        case LOGIN_RESET:
            return {};
        
        default:
            return state;
    }
}