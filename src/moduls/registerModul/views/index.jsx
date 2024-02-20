import React, { useEffect } from 'react'

import {
    NavLink
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"

import { AiOutlineWechat } from 'react-icons/ai';

import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import { register } from '../actions/registerActions'

export default function Index() {
    const REGISTER = useSelector((state) => state.register);

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("token")){
            window.location.replace('/');
        }
    }, []);

    useEffect(() => {
        if(REGISTER.success){
            console.log('tes register');
            window.location.replace('/');
        }
    }, [REGISTER])
    

    const handleRegister = (e) => {
        e.preventDefault();

        const data = {
            name : e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value  
        }

        dispatch(register(data));
    }

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold space-x-2">
                        <AiOutlineWechat className="text-3xl text-blue-900" />
                        <span className="text-blue-900">HahaHehe</span>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 sm:p-8">
                            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 outline-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Testing" required="" />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 outline-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Testing" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 outline-blue-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Testing" required="" />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                            </form>
                            <div className="text-center space-x-2">
                                <span>Already have an account?</span>
                                <NavLink className="text-blue-800 hover:text-blue-500" to="/login" >
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
