import { Route, Routes } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute'

import Chatting from './moduls/chattingModul/views';
import Login from './moduls/loginModul/views';
import Register from './moduls/registerModul/views';

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={
          <ProtectedRoute path="" element={<Chatting />}></ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
