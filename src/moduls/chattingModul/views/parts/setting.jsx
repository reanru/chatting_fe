import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux"

import PropTypes from 'prop-types';

import { AiOutlineClose } from 'react-icons/ai';

import { logout } from "../../actions/chattingActions"

function Setting({ openSetting, setOpenSetting }) {
    const LOGOUT = useSelector((state) => state.logout);

    const dispatch = useDispatch();

    useEffect(() => {
        if(LOGOUT.success){
            localStorage.removeItem("token");
            window.location.replace("/login");
        }
    }, [LOGOUT])
    
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={`w-full sm:w-80 lg:w-[28rem] bg-white flex flex-col justify-between h-screen z-30 fixed
                            transform transition ease-in-out duration-700 shadow-lg ` + (openSetting ? "translate-x-0" : "-translate-x-[650px]") }>

            <div className="flex items-center justify-between space-x-4 min-h-[5rem] px-6 border-b">
                <button onClick={() => {setOpenSetting(!openSetting)}} className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                    <AiOutlineClose className="text-gray-500 text-xl group-hover:text-white" />
                </button> 
                {/* <button onClick={() => {setChecked(!checked)}} className="group transition-all hover:bg-gray-400 ring-1 ring-gray-400 hover:ring-gray-300 active:ring-0 p-2 rounded-lg">
                    { checked ? (
                        <MdNightlight className="text-gray-500 text-xl group-hover:text-white" />
                    ) : (
                        <BsFillSunFill className="text-gray-500 text-xl group-hover:text-white" />
                    ) }
                </button>  */}
            </div>

            <div className="flex justify-center items-center space-x-2 min-h-[4rem] px-6 border-b">  
                <button onClick={handleLogout} className="font-medium text-gray-700 transition-all hover:bg-gray-200 hover:ring-gray-300 active:ring-0 py-2 px-4 rounded-lg border-b-2">
                    Logout
                </button>         
            </div>

        </div>
    )
}

Setting.propTypes = {
    openSetting: PropTypes.bool.isRequired,
    setOpenSetting: PropTypes.func.isRequired
}

export default Setting;