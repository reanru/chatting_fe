import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...rest }) {
    const isAuthenticated = !!localStorage.getItem("token");

    return (        
        isAuthenticated ? <Routes><Route {...rest} element={Component} /></Routes>
                       : <Navigate push to="/login" />
    )
}
