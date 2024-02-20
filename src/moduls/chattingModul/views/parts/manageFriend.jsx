import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';

import { Tooltip } from 'react-tooltip'

import { getRandomColor, getNickname } from "../../../../function/general"

import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiUserX } from "react-icons/fi";
import { FaSearch, FaUserPlus, FaUserCircle, FaUserCheck } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6";
import { BiTrashAlt } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdClose } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { searchUser, sendFriendRequest, acceptFriendRequest, cancelFriendRequest, removeFriendRequest, getListFriendRequest } from "../../actions/chattingActions"

const friendList = [
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" },
    { username: "username", name: "Full Name" }
]

function Friend({ openFriend, setOpenFriend }) {
    const inputSearchUserRef = useRef(null);

    const get_user = useSelector((state) => state.get_user);
    const search_user = useSelector((state) => state.search_user);
    const get_list_friend_request = useSelector((state) => state.get_list_friend_request);
    const send_friend_request = useSelector((state) => state.send_friend_request);
    const accept_friend_request = useSelector((state) => state.accept_friend_request);
    const cancel_friend_request = useSelector((state) => state.cancel_friend_request);
    const remove_friend_request = useSelector((state) => state.remove_friend_request);

    const dispatch = useDispatch();

    const [openManageFriend, setOpenManageFriend] = useState(false);
    const [menuType, setMenuType] = useState("add-friend"); // add-friend, friend-request

    const [loadingSearchUser, setLoadingSearchUser] = useState(false);
    const [userSearched, setUserSearched] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if(get_user.success){
            setUserId(get_user.data.data.id);
        }
    }, [get_user])
    
    useEffect(() => {
        if(search_user.success){
            setUserSearched(search_user.data.data);
            setLoadingSearchUser(false);
        }
    }, [search_user])

    useEffect(() => {
        if(get_list_friend_request.success){
            console.log('get_list_friend_request ', get_list_friend_request.data.data);
            setFriendRequests(get_list_friend_request.data.data)
        }
    }, [get_list_friend_request])

    useEffect(() => {
        if(send_friend_request.success || cancel_friend_request.success){
            dispatch(searchUser(inputSearchUserRef.current.value));
        }
    }, [send_friend_request, cancel_friend_request])

    useEffect(() => {
        if(remove_friend_request.success){
            dispatch(getListFriendRequest());
        }
    }, [remove_friend_request])

    useEffect(() => {
        if(accept_friend_request.success){
            dispatch(getListFriendRequest());
        }
    }, [accept_friend_request])
    
    
    useEffect(() => {
        if(menuType === "friend-request"){
            dispatch(getListFriendRequest());
        }
    }, [menuType])
    
    const handleSearchUser = (data) => {
        setLoadingSearchUser(true);
        dispatch(searchUser(data));
    }

    const handleSendFriendRequest = (receiverId) => {
        dispatch(sendFriendRequest({
            sender_id : userId,
            receiver_id : receiverId
        }));
    }

    const handleAcceptFriendRequest = (friendRequestId) => {
        dispatch(acceptFriendRequest(friendRequestId));
    }

    const handleCancelFriendRequest = (receiverId) => {
        dispatch(cancelFriendRequest({
            sender_id: userId,
            receiver_id: receiverId
        }));
    }

    const handleRemoveFriendRequest = (senderId, receiverId) => {
        dispatch(removeFriendRequest({
            sender_id: senderId,
            receiver_id: receiverId
        }));
    }

    return (
        <>
            <div className={`w-full sm:w-80 lg:w-[28rem] bg-white flex flex-col h-screen z-30 fixed
                            transform transition ease-in-out duration-700 shadow-lg ` + (openFriend ? "translate-x-0" : "-translate-x-[650px]") }>

                <div className="flex items-center justify-between space-x-4 min-h-[5rem] px-6 border-b">
                    <button onClick={() => {setOpenFriend(!openFriend)}} className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                        <AiOutlineClose className="text-gray-500 text-xl group-hover:text-white" />
                    </button> 
                    <button onClick={() => {setOpenManageFriend(!openManageFriend)}} className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                        { openManageFriend ? (
                            <FiUserX className="text-gray-500 text-xl group-hover:text-white" />
                        ) : (
                            <FaUserPlus className="text-gray-500 text-xl group-hover:text-white" />
                        ) }
                    </button> 
                </div>

                {/* Manage Friend Section */}
                <div className={"bg-gray-50 w-full px-6 py-4 transition-all space-y-2 " + (openManageFriend ? " " : " hidden")}>

                    <div className="bg-gray-100 flex justify-center space-x-2 p-1 rounded-lg">
                        <div onClick={()=>setMenuType("add-friend")} className={"font-medium text-white py-1 px-3 rounded-full " + ( menuType !== "add-friend" ? " cursor-pointer bg-gray-400 hover:bg-gray-300" : " bg-blue-400" ) }>
                            Add Friend
                        </div>
                        <div onClick={()=>setMenuType("friend-request")} className={"font-medium text-white py-1 px-3 rounded-full " + ( menuType !== "friend-request" ? " cursor-pointer bg-gray-400 hover:bg-gray-300" : " bg-blue-400" ) }>
                            Friend Request
                        </div>
                    </div>

                    <div className="border p-2 rounded-md">
                        { menuType === "add-friend" && (
                            <div>
                                <div className="border-b pb-2">
                                    <div className="w-full relative">
                                        <input
                                            ref={inputSearchUserRef}
                                            type="text" 
                                            className="py-1 pl-5 pr-9 h-9 border border-gray-200 focus:border-gray-500 bg-gray-100 rounded-full w-full focus:outline-none" 
                                            placeholder="Enter to search" 
                                            onKeyDown={(e)=>{
                                                if(e.key === "Enter"){
                                                    handleSearchUser(e.target.value);
                                                }
                                            }}
                                        />
                                        <div className=" flex absolute inset-y-0 right-5 items-center pointer-events-none">
                                            <FaSearch className="w-4 h-4 text-secondary-500" />
                                        </div>
                                    </div>   
                                </div>

                                <Tooltip id="cancel-add-friend" />
                                <Tooltip id="send-friend-request" />
                                <div className="max-h-40 overflow-y-auto">
                                    { !loadingSearchUser && userSearched.map((data) => (
                                        <div key={data.id} className="flex items-center justify-between py-2 hover:bg-gray-100 cursor-pointer">
                                            <div className="flex space-x-2">
                                                <div className={`flex-none w-11 h-11 rounded-full border border-gray-200 ${getRandomColor()} flex justify-center items-center`}>
                                                    <span className="text-lg font-semibold text-white">FL</span>
                                                </div>
                                                <div className="font-medium ">
                                                    <div className="text-gray-600">{data.username}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{data.name}</div>
                                                </div>
                                            </div>
                                            <div className="flex mr-1">
                                                { data.id === userId && (
                                                    <FaUserCircle className="w-5 h-5 text-blue-600" /> 
                                                ) }
                                                { data.id !== userId && (
                                                    <>
                                                        { data.request_accepted === null && (
                                                            <div
                                                                data-tooltip-id="send-friend-request"
                                                                data-tooltip-content="Send friend request"
                                                                className="border p-1 rounded-md bg-white cursor-pointer"
                                                                onClick={()=>handleSendFriendRequest(data.id)} >
                                                                    <FiPlus className="text-blue-500" />
                                                            </div>
                                                        ) }

                                                        { data.request_accepted !== null && (
                                                            <>
                                                                { data.request_accepted ? (
                                                                    <FaUserCheck className="w-5 h-5 text-blue-600" />
                                                                ) : (
                                                                    <div className="flex space-x-2">
                                                                        <div className="p-1 rounded-md cursor-pointer text-xs text-gray-500 italic">Waiting Response</div>
                                                                        <div 
                                                                            className="border p-1 rounded-md bg-white cursor-pointer" 
                                                                            data-tooltip-id="cancel-add-friend" 
                                                                            data-tooltip-content="Cancel friend request"
                                                                            onClick={()=>handleCancelFriendRequest(data.id)}>
                                                                                <MdClose className="text-red-500" />
                                                                        </div>
                                                                    </div>
                                                                ) }
                                                            </>    
                                                        ) }
                                                    </>
                                                ) }
                                            </div>
                                        </div>
                                    )) }
                                    { !loadingSearchUser && userSearched.length <= 0 && (
                                        <div className="py-2 h-8">
                                            <div className="text-center text-gray-500">Not available</div>
                                        </div>
                                    ) }
                                    { loadingSearchUser && (
                                        <div className="py-2 h-8">
                                            <AiOutlineLoading3Quarters className="text-gray-500 mx-auto h-5 w-5 animate-spin" />
                                        </div>
                                    ) }
                                </div>
                            </div>
                        ) }

                        { menuType === "friend-request" && (
                            <div className="">
                                <div className="text-center font-semibold text-gray-500 border-b pb-2">Incoming friend requests</div>

                                <Tooltip id="remove-add-friend" />
                                <Tooltip id="accept-friend-request" />
                                <div className="max-h-52 overflow-y-auto">
                                    { friendRequests.map((data) => (
                                        <div key={data.id} className="flex items-center justify-between py-2 hover:bg-gray-100">
                                            <div className="flex space-x-2">
                                                <div className={`flex-none w-11 h-11 rounded-full border border-gray-200 ${getRandomColor()} flex justify-center items-center`}>
                                                    <span className="text-lg font-semibold text-white">{getNickname(data.name)}</span>
                                                </div>
                                                <div className="font-medium ">
                                                    <div className="text-gray-600">{data.username}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{data.name}</div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-1 mr-1">
                                                <div 
                                                    className="border p-1 rounded-md bg-white cursor-pointer" 
                                                    data-tooltip-id="remove-add-friend" 
                                                    data-tooltip-content="Remove friend request"
                                                    onClick={()=>handleRemoveFriendRequest(data.sender_id, data.receiver_id)}>
                                                        <BiTrashAlt className="text-red-500" />
                                                </div>
                                                <div 
                                                    className="border p-1 rounded-md bg-white cursor-pointer"
                                                    data-tooltip-id="accept-friend-request" 
                                                    data-tooltip-content="Accept friend request"
                                                    onClick={()=>handleAcceptFriendRequest(data.id)}>
                                                        <FaCheck className="text-blue-700" />
                                                </div>
                                            </div>
                                        </div>
                                    )) }
                                    { friendRequests.length <= 0 && (
                                        <div className="py-2 h-8">
                                            <div className="text-center text-gray-500">Not available</div>
                                        </div>
                                    ) }
                                </div>
                            </div>
                        ) }

                    </div>




                </div>

                <div className="font-medium text-gray-600 px-6 py-4 border-b">
                    Friend List
                </div>

                <div className="h-full overflow-y-auto px-6 py-4 space-y-2">

                    <div className="">
                        { friendList.map((data, key) => (
                            <div key={key} className="flex items-center py-2 space-x-2 hover:bg-gray-100 cursor-pointer">
                                <div className={`flex-none w-11 h-11 rounded-full border border-gray-200 ${getRandomColor()} flex justify-center items-center`}>
                                    <span className="text-lg font-semibold text-white">FL</span>
                                </div>
                                <div className="font-medium ">
                                    <div className="text-gray-600">{data.username}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{data.name}</div>
                                </div>
                            </div>
                        )) }
                    </div>

                </div>

            </div>
        </>
    )
}

Friend.propTypes = {
    openFriend: PropTypes.bool.isRequired,
    setOpenFriend: PropTypes.func.isRequired,
}

export default Friend;