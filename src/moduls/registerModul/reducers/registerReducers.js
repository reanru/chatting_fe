import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_RESET,
} from '../constants/registerConstants';

export const registerReducers = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { loading: true};

        case REGISTER_SUCCESS:
            return { loading: false, data: action.payload, success: true };

        case REGISTER_FAIL:
            return { loading: false, error: action.payload };

        case REGISTER_RESET:
            return {};
        
        default:
            return state;
    }
}