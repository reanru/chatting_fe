import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import { MdInsertEmoticon, MdSend } from 'react-icons/md';

import { getUser, sendCurrentMessage } from "../actions/chattingActions"

import { getRandomColor, getNickname } from "../../../function/general"

import io from 'socket.io-client';

import usePrevious from "../../../customHooks/usePrevious"

import ManageFriend from "./parts/manageFriend";
import Setting from "./parts/setting";
import IncomingMessages from "./parts/incomingMessages";

import Lottie from 'lottie-react';
import animationData from "../../../assets/lottie/message-loading.json";

// const socket = io('http://localhost:3000');

const userList = [
    { id: uuidv4(), name : "John Stone", text : "It is a long established fact that a reader" },
    { id: uuidv4(),name : "Ponnappa Priya", text : "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters" },
    { id: uuidv4(),name : "Mia Wong", text : "Many desktop publishing packages and web page" },
    { id: uuidv4(),name : "Peter Stanbridge", text : "Various versions have evolved over the years" },
    { id: uuidv4(),name : "Natalie Lee-Walsh", text : "page when looking at its layout" },
    { id: uuidv4(),name : "Tamzyn French", text : "variations of passages of Lorem Ipsum available, but the majority" },
    { id: uuidv4(),name : "Salome Simoes", text : "randomised words which don't look even slightly believable" }
]

const chat = [
    { userId : "111", text : "Excepteur sint occaecat cupidatat non proident" },
    { userId : "111", text : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto" },
    { userId : "222", text : "Nemo enim ipsam voluptatem quia voluptas sit aspernatur" },
    { userId : "222", text : "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci" },
    { userId : "222", text : "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?" },
    { userId : "111", text : "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil" },
    { userId : "222", text : "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system" },
    { userId : "222", text : "and expound the actual teachings of the great explorer" },
    { userId : "222", text : "the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure" },
    { userId : "222", text : "but because those who do not know" },
    { userId : "111", text : "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur" },
    { userId : "111", text : "except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy" }
]

export default function Index() {
    const get_user = useSelector((state) => state.get_user);
    const send_current_message = useSelector((state) => state.send_current_message);
    const select_friend_message = useSelector((state) => state.select_friend_message);

    const dispatch = useDispatch();

    const messagesRef = useRef();

    const [openSetting, setOpenSetting] = useState(false);
    const [openFriend, setOpenFriend] = useState(false);

    const [newMessage, setNewMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState(''); const prevInput = usePrevious(input);
    
    const [socket, setSocket] = useState(null);
    const [selectedFriend, setSelectedFriend] = useState(null); // save friend id

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if(get_user.success){
            // console.log('get_user ', get_user.data.data);
            setUserId(get_user.data.data.id);
        }
    }, [get_user])

    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages])

    useEffect(() => {
        dispatch(getUser());

        // Menghubungkan ke server Socket.IO
        const newSocket = io('http://localhost:3000');                
        setSocket(newSocket);     

        return () => {
            console.log('disconnect');
            newSocket.disconnect();    
        }
    }, []);

    useEffect(() => {
        // Menerima pesan
        if(socket){
            socket.on('receiveMessage', (data) => {
                console.log(`cek receiveMessage (${selectedFriend} - ${userId}) `);
                // if(data.sender === selectedFriend && data.receiver === userId){
                //     setMessages(prevState => {
                //         return [...prevState, data]
                //     })
                // }
                setNewMessage(data);
            });
        }

        // return () => {
        //     if (selectedFriend) {
        //         // clear event listener
        //         socket.off('socket off');
        //     }
        // };
    }, [socket])
    
    useEffect(() => {
        // menerima pesan dari percakapan yang dipilih
        // pengirim pesan = teman yang dipilih (percakapan dipilih) dan penerima = current user 
        if(newMessage?.sender === selectedFriend && newMessage?.receiver === userId){
            setMessages(prevState => {
                return [...prevState, newMessage]
            }) 
        }
    }, [newMessage])

    useEffect(() => {
        if(send_current_message.success){
            // mengirim pesan pada teman, pesan yang dikirim ditambahkan pada daftar pesan yang sedang aktif (percakapan dipilih)
            // penerima = current user
            if(send_current_message.data.receiver === selectedFriend){
                setMessages(prevState => {
                    return [...prevState, send_current_message.data]
                })
            }
        }
    }, [send_current_message])

    useEffect(() => {
        // mengambil id pengguna dan daftar pesan dari teman yang dipilih
        if(select_friend_message.success){
            console.log('select_friend_message ', select_friend_message.data);
            setSelectedFriend(select_friend_message.data.friendId);
            setMessages(select_friend_message.data.messages);
        }
    }, [select_friend_message])
    
    useEffect(() => {
        // trigger status true when input is empty and will start typing 
        if(prevInput.length === 0 && input.length > 0){             
            socket.emit('typingStatus', { sender: userId, receiver: selectedFriend, active: true });
        }

        // trigger status false when input is empty because text is deleted
        if((prevInput !== input) && input.length === 0){
            socket.emit('typingStatus', { sender: userId, receiver: selectedFriend, active: false });
        }
    }, [input])
    
    const sendMessage = (e) => {
        e.preventDefault();

        dispatch(sendCurrentMessage({ sender: userId, receiver: selectedFriend, message: input }));

        socket.emit('sendMessage', { sender: userId, receiver: selectedFriend, message: input });
        setInput('');
    };

    const handleInputOnFocus = () => {
        socket.emit('typingStatus', { sender: userId, receiver: selectedFriend, active: true });
    }

    const handleInputOnBlur = () => {
        socket.emit('typingStatus', { sender: userId, receiver: selectedFriend, active: false });
    }

    // if(get_user.loading){
    //     return (
    //         <div>
    //             <Lottie
    //                 animationData={animationData}
    //                 loop={true}
    //                 autoplay={true}
    //             />
    //         </div>
    //     )
    // }

    return (
        <>
            <div className="flex">

                <ManageFriend 
                    openFriend={openFriend}
                    setOpenFriend={setOpenFriend}
                />

                <Setting 
                    openSetting={openSetting} 
                    setOpenSetting={setOpenSetting}
                />

                <IncomingMessages 
                    socket={socket} 
                    userId={userId}
                    openFriend={openFriend}
                    setOpenFriend={setOpenFriend}
                    openSetting={openSetting}
                    setOpenSetting={setOpenSetting}
                />

                <div className="h-screen overflow-hidden flex flex-col flex-grow bg-white shadow-sm">
                    <div className="flex items-center min-h-[5rem] px-6 border-b">
                        <div className="flex space-x-2">
                            {/* <div className={`flex-none w-12 h-12 rounded-full border border-gray-200 ${getRandomColor()} flex justify-center items-center`}>
                                <span className="text-lg font-semibold text-white">{ getNickname(USERNAME) }</span>
                            </div> */}
                            <div className="font-medium flex flex-col">
                                <div className="text-base text-gray-500 dark:text-gray-400 line-clamp-1">You</div>
                                <div className="text-xs text-green-500">Online</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-8 py-4 overflow-y-auto h-full" ref={messagesRef}>
                        { selectedFriend ? (
                            <div className="space-y-5">
                                { messages.map((data, key) => (
                                    <div key={key}>
                                        { data.sender === userId ? (
                                            <div className="flex justify-end w-full">
                                                <div className="bg-gray-200 p-3 rounded-l-xl rounded-br-lg max-w-xl">
                                                    { data.message }
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-start w-full space-x-4">
                                                <div className="bg-blue-200 p-3 rounded-r-xl rounded-bl-xl max-w-xl">
                                                    { data.message }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )) }
                                { Object.keys(messages).length === 0 && (
                                    <div className="text-center">Tidak ada pesan.</div>
                                ) }
                            </div>
                        ):(
                            <div className="text-center">Send your message.</div>
                        ) }
                    </div>

                    { selectedFriend && (
                        <div className="items-center flex min-h-[4rem] px-4 shadow-sm">
                            <form onSubmit={sendMessage} className="flex w-full space-x-2 ">
                                <button className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                                    <MdInsertEmoticon className="text-gray-500 text-xl group-hover:text-white" />
                                </button>  
                                <div className="flex w-full">
                                    <input
                                        value={input} 
                                        onFocus={handleInputOnFocus}
                                        onBlur={handleInputOnBlur}
                                        onChange={(e) => setInput(e.target.value)}
                                        type="text" 
                                        className="py-1 pl-5 pr-9 h-9 border border-gray-200 focus:border-gray-500 bg-gray-100 rounded-full w-full focus:outline-none" 
                                        placeholder="Type here" 
                                    />
                                </div>
                                <button type="submit" className="group transition-all bg-blue-300 hover:bg-gray-400 ring-1 ring-blue-300 hover:ring-gray-300 active:ring-0 p-2 rounded-full">
                                    <MdSend className="text-white text-xl" />
                                </button> 
                            </form>
                        </div>
                    ) }

                </div>
            </div>
        </>
    )
}
