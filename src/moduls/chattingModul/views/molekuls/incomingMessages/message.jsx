import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from "react-redux";

import { selectFriendMessage } from "../../../actions/chattingActions"

import { getRandomColor, getNickname } from "../../../../../function/general"

function Message({ userId, friendId, name, socket }) {
    const send_current_message = useSelector((state) => state.send_current_message);

    const dispatch = useDispatch();

    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log('render');
    }, [])

    useEffect(() => {
        if(send_current_message.success){
            if(send_current_message.data.receiver === friendId){
                console.log('testing get current message ', send_current_message.data.sender, friendId);
                setMessages(prevState => {
                    return [...prevState, send_current_message.data]
                })
            }
        }
    }, [send_current_message])
    
    useEffect(() => {
        // Menangani pesan yang diterima dari server
        if (socket) {
            socket.on('typingStatus', (data) => {
                if(data.sender === friendId && data.receiver === userId){
                    console.log(`check typingStatus - ${friendId} - `, data);
                    if(data.active){
                        setTyping(true)
                    }else{
                        setTyping(false);
                    }
                }
            });

            // Menerima pesan
            socket.on('receiveMessage', (data) => {
                if(data.sender === friendId && data.receiver === userId){
                    setMessages(prevState => {
                        return [...prevState, data]
                    })
                }
            });
        }
    }, [socket]);

    const handleSelectFriend = () => {
        dispatch(selectFriendMessage({ 
            friendId: friendId, 
            messages: messages,
        }));
    }

    return (
        <div onClick={handleSelectFriend} className="flex items-center space-x-4 hover:bg-gray-100 cursor-pointer">
            <div className={`flex-none w-12 h-12 rounded-full border border-gray-200 ${getRandomColor()} flex justify-center items-center`}>
                <span className="text-lg font-semibold text-white">{ getNickname(name) }</span>
            </div>
            <div className="font-medium ">
                <div>{ name }</div>
                { typing ? (
                    <div className="font-semibold text-sm text-green-500 line-clamp-1">Mengetik...</div>
                ) : (
                    <>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                            { messages.length > 0 ? messages[messages.length-1].message : '-' }
                        </div>
                    </>
                ) }
            </div>
        </div>
    )
}

Message.propTypes = {
    userId: PropTypes.string.isRequired,
    friendId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired,
}

export default memo(Message);
