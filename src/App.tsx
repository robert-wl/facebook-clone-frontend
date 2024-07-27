import "@/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import "toastify-js/src/toastify.css";
import ActivateAccountProtector from "@/components/middleware/ActivateAccountProtector";
import ActivateAccount from "@/pages/auth/ActivateAccount.tsx";
import ForgotAccount from "@/pages/auth/ForgotAccount.tsx";
import ResetPassword from "@/pages/auth/ResetPassword.tsx";
import ResetPasswordProtector from "@/components/middleware/ResetPasswordProtector.tsx";
import AuthenticatedProtector from "@/components/middleware/AuthenticatedProtector.tsx";
import Home from "@/pages/home/Home.tsx";
import User from "@/pages/user/User.tsx";
import UnauthenticatedProtector from "@/components/middleware/UnauthenticatedProtector.tsx";
import Friends from "@/pages/friends/Friends.tsx";
import CreateStory from "@/pages/story/CreateStory.tsx";
import Stories from "@/pages/story/Stories.tsx";
import Messages from "@/pages/messages/Messages.tsx";
import CreateReels from "@/pages/reels/CreateReels.tsx";
import Reels from "@/pages/reels/Reels.tsx";
import CreateGroup from "@/pages/group/CreateGroup.tsx";
import Group from "@/pages/group/Group.tsx";
import GroupDetail from "@/pages/group/GroupDetail.tsx";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Search from "@/pages/search/Search.tsx";
import Notifications from "@/pages/notifications/Notifications.tsx";
import StoriesHome from "@/pages/story/StoriesHome.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <UnauthenticatedProtector>
              <Login />
            </UnauthenticatedProtector>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthenticatedProtector>
              <Register />
            </UnauthenticatedProtector>
          }
        />
        <Route
          path="/forgot"
          element={
            <UnauthenticatedProtector>
              <ForgotAccount />
            </UnauthenticatedProtector>
          }
        />
        <Route
          path="/forgot/:forgotID"
          element={
            <UnauthenticatedProtector>
              <ResetPasswordProtector>
                <ResetPassword />
              </ResetPasswordProtector>
            </UnauthenticatedProtector>
          }
        />
        <Route
          path="/activate/:activationID"
          element={
            <UnauthenticatedProtector>
              <ActivateAccountProtector>
                <ActivateAccount />
              </ActivateAccountProtector>
            </UnauthenticatedProtector>
          }
        />
        <Route
          path="/"
          element={
            <AuthenticatedProtector>
              <Home />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/user/:username"
          element={
            <AuthenticatedProtector>
              <User key={Date.now()} />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/friends"
          element={
            <AuthenticatedProtector>
              <Friends />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/stories"
          element={
            <AuthenticatedProtector>
              <StoriesHome />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/stories/create"
          element={
            <AuthenticatedProtector>
              <CreateStory />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/stories/:username"
          element={
            <AuthenticatedProtector>
              <Stories />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/messages/"
          element={
            <AuthenticatedProtector>
              <Messages />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/messages/:conversationID"
          element={
            <AuthenticatedProtector>
              <Messages />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/reels/create"
          element={
            <AuthenticatedProtector>
              <CreateReels />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/reels"
          element={
            <AuthenticatedProtector>
              <Reels />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/reels/:reelId"
          element={
            <AuthenticatedProtector>
              <Reels />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/group"
          element={
            <AuthenticatedProtector>
              <Group />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/group/:groupId"
          element={
            <AuthenticatedProtector>
              <GroupDetail />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/group/create"
          element={
            <AuthenticatedProtector>
              <CreateGroup />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/search/:searchQuery"
          element={
            <AuthenticatedProtector>
              <Search />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/search"
          element={
            <AuthenticatedProtector>
              <Search />
            </AuthenticatedProtector>
          }
        />
        <Route
          path="/notification"
          element={
            <AuthenticatedProtector>
              <Notifications />
            </AuthenticatedProtector>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
