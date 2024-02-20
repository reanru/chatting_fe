import { combineReducers } from "redux";
import { createStore, compose, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

// import { getBasicAlertReducer } from "./reducers/basicAlertReducer"
import { combineLoginReducers } from "./moduls/loginModul/init/store"
import { combineRegisterReducers } from "./moduls/registerModul/init/store"
import { combineChattingReducers } from "./moduls/chattingModul/init/store"

// const generalReducers = {
//     getBasicAlert : getBasicAlertReducer,
// }

export const loginmodul_login_reducers = (state = { data: {} }, action) => {

};

const allReducersConst = Object.assign(
    // generalReducers, 
    combineChattingReducers,
    combineLoginReducers,
    combineRegisterReducers
);

const reducers = combineReducers(allReducersConst);

const initialState = {
  login: { token: localStorage.getItem("token") },
};


const store = createStore(
    reducers, 
    initialState,
    compose(applyMiddleware(thunk)));

export default store;
