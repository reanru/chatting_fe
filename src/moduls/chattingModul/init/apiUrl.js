import { BASE_URL }  from "../../../config/urlConfig";

export const API_ENDPOINT = {
    // USE
    GET_USER : () => `${BASE_URL}/api/users/current`,
    LOGOUT : `${BASE_URL}/api/users/logout`,
    SEARCH_USER : (page, size, search) => `${BASE_URL}/api/users?page=${page}&size=${size}&search=${search}`,
    
    // FRIEND REQUEST
    SEND_FRIEND_REQUEST : `${BASE_URL}/api/friend-requests`,
    ACCEPT_FRIEND_REQUEST: (friendRequestId) => `${BASE_URL}/api/friend-requests/${friendRequestId}`,
    CANCEL_FRIEND_REQUEST : `${BASE_URL}/api/friend-requests`,
    REMOVE_FRIEND_REQUEST : `${BASE_URL}/api/friend-requests`,
    GET_LIST_FRIEND_REQUEST : `${BASE_URL}/api/friend-requests`,

    // FRIEND
    GET_LIST_FRIEND : `${BASE_URL}/api/friends`,
}