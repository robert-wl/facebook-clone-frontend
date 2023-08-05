import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import "toastify-js/src/toastify.css"
import ActivateAccountProtector from "../components/middleware/ActivateAccountProtector.tsx";
import ActivateAccount from "./pages/ActivateAccount.tsx";
import ForgotAccount from "./pages/ForgotAccount.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ResetPasswordProtector from "../components/middleware/ResetPasswordProtector.tsx";
import AuthenticatedProtector from "../components/middleware/AuthenticatedProtector.tsx";
import Home from "./pages/Home.tsx";
import User from "./pages/User.tsx";

function App() {

  return (
   <Routes>
       <Route path="/login" element={
           <Login />
       } />
       <Route path="/register" element={
           <Register />
       } />
       <Route path="/forgot" element={
           <ForgotAccount />
       } />
       <Route path="/forgot/:forgotID" element={
           <ResetPasswordProtector>
               <ResetPassword />
           </ResetPasswordProtector>
       } />
       <Route path="/activate/:activationID" element={
           <ActivateAccountProtector>
               <ActivateAccount />
           </ActivateAccountProtector>
       } />
       <Route path="/" element={
           <AuthenticatedProtector>
               <Home />
           </AuthenticatedProtector>
       } />
       <Route path="/user/:username" element={
           <AuthenticatedProtector>
               <User />
           </AuthenticatedProtector>
       } />
   </Routes>
  )
}

export default App
