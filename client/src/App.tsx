//imports
import React from "react";
import "./App.css";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";
import UserSettings from "./Views/UserSettings";
import UserPage from "./Views/UserPage";
import RankPage from "./Views/RankPage";
import FriendPage from "./Views/FriendPage";
import ProfilePicSetter from "./Views/ProfilePicSetter";

function App() {
  return (
		//Routes in the webapp
		<BrowserRouter>
			<React.StrictMode>
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/profpicsetter" element={<ProfilePicSetter/>} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />}></Route>
					<Route path="/userPage" element={<UserPage />} />
					<Route path="/rankPage" element={<RankPage />} />
					<Route path="/friendPage" element={<FriendPage />} />
					<Route path="/settings" element={<UserSettings />} />
				</Routes>
			</React.StrictMode>
		</BrowserRouter>
	);
}

export default App;
