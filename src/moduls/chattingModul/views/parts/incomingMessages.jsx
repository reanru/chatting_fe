import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { RiContactsLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa"

import Message from "../molekuls/incomingMessages/message";

import { useDispatch, useSelector } from "react-redux";
import { getListFriend, resetGetListFriend } from "../../actions/incomingMessagesActions"

const availableMessages = [
    { id : "tes", name: "Testing", messages : [] },
    { id : "anru", name: "Refandi Andika Runtu", messages : [] },
    { id : "user", name: "USER", messages : [] }
];

function IncomingMessages({ socket, userId, openFriend, setOpenFriend, openSetting, setOpenSetting }) {
    const get_list_friend = useSelector((state) => state.get_list_friend);

    const dispatch = useDispatch();

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        dispatch(getListFriend());
    }, [])

    useEffect(() => {
        if(get_list_friend.success){
            console.log('get_list_friend ', get_list_friend.data);
            setFriends(get_list_friend.data.data);
        }
    }, [get_list_friend])
    
    useEffect(() => {
        if(socket && userId){  
            let rooms = [];
            friends.filter((data) => !data.id.includes(userId)).map(data => {
                rooms.push(`${userId}#${data.id}`);
            });

            console.log('joinManyRooms ', rooms);
            
            socket.emit('joinManyRooms', rooms);
        }
    }, [socket, userId])
    

    return (
        <div className="h-screen hidden justify-between sm:flex sm:flex-col sm:w-80 lg:w-[28rem] bg-white transition-all ">
            <div className="flex items-center space-x-4 min-h-[5rem] px-6 border-b">
                <button onClick={() => {setOpenFriend(!openFriend)}} className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                    <RiContactsLine className="text-gray-500 text-xl group-hover:text-white" />
                </button> 
                <div className="w-full relative">
                    <input 
                        type="text" 
                        className="py-1 pl-5 pr-9 h-10 border border-gray-200 focus:border-gray-500 bg-gray-100 rounded-full w-full focus:outline-none" 
                        placeholder="Cari" 
                    />
                    <div className=" flex absolute inset-y-0 right-5 items-center pointer-events-none">
                        <FaSearch className="w-4 h-4 text-secondary-500" />
                    </div>
                </div>            
            </div>
            { socket && userId && (
                <div className="h-full overflow-auto px-8 py-4">
                    <div className="space-y-8">
                        { friends.filter((data) => !data.id.includes(userId)).map((data, key) => (
                            <Message 
                                key={key} 
                                userId={userId} 
                                friendId={data.id}
                                name={data.name} 
                                socket={socket}
                            />
                        )) }
                    </div>
                </div>
            )}
            <div className="bg-gray-50 flex justify-end items-center space-x-2 min-h-[4rem] px-6 border-b">  
                <button onClick={() => {setOpenSetting(!openSetting)}} className="group transition-all hover:bg-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                    <BsThreeDotsVertical className="text-gray-500 text-xl group-hover:text-white" />
                </button>         
            </div>
        </div>
    )
}

IncomingMessages.propTypes = {
    // socket: PropTypes.object.isRequired,
    // username: PropTypes.string.isRequired,
    openFriend: PropTypes.bool.isRequired,
    setOpenFriend: PropTypes.func.isRequired,
}

export default memo(IncomingMessages);