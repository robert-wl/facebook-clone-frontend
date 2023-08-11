import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import "toastify-js/src/toastify.css";
import ActivateAccountProtector from "../components/middleware/ActivateAccountProtector.tsx";
import ActivateAccount from "./pages/ActivateAccount.tsx";
import ForgotAccount from "./pages/ForgotAccount.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ResetPasswordProtector from "../components/middleware/ResetPasswordProtector.tsx";
import AuthenticatedProtector from "../components/middleware/AuthenticatedProtector.tsx";
import Home from "./pages/Home.tsx";
import User from "./pages/User.tsx";
import UnauthenticatedProtector from "../components/middleware/UnauthenticatedProtector.tsx";
import Friends from "./pages/Friends.tsx";
import CreateStory from "./pages/CreateStory.tsx";
import Stories from "./pages/Stories.tsx";
import Messages from "./pages/Messages.tsx";

function App() {
	return (
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
						<User />
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
						<Messages key={Date.now()} />
					</AuthenticatedProtector>
				}
			/>
		</Routes>
	);
}

export default App;
