import { 
    getUserReducers,
    logoutReducers,
    sendCurrentMessageReducers,
    selectFriendMessageReducers,
    searchUserReducers,
    sendFriendRequestReducers,
    acceptFriendRequestReducers,
    cancelFriendRequestReducers,
    removeFriendRequestReducers,
    getListFriendRequestReducers
} from "../reducers/chattingReducers"

import {
    getListFriendReducers
} from "../reducers/incomingMessagesReducers"

export const combineChattingReducers = {
    // USER
    get_user: getUserReducers,
    logout: logoutReducers,
    send_current_message: sendCurrentMessageReducers,
    select_friend_message: selectFriendMessageReducers,
    search_user: searchUserReducers,
    
    // FRIEND REQUESt
    send_friend_request: sendFriendRequestReducers,
    accept_friend_request: acceptFriendRequestReducers,
    cancel_friend_request: cancelFriendRequestReducers,
    remove_friend_request: removeFriendRequestReducers,
    get_list_friend_request: getListFriendRequestReducers,

    // FRIEND
    get_list_friend: getListFriendReducers
};