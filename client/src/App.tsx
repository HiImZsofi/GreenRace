//imports
import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Views/Login";
import Grid from "@mui/material/Grid";
import { response } from "express";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	BrowserRouter,
} from "react-router-dom";
import UserPage from "./Views/userPage";
import RankPage from "./Views/rankPage";
import FriendPage from "./Views/friendPage";

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3306/api")
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((error) => setError(error));
	}, []);

	const router = createBrowserRouter([
		{
			path: "/login",
 			element: <LoginForm />,
		},
	]);

	return (
		<React.StrictMode>
			<RouterProvider router={router} />
			<Routes>
				<Route path="/userPage" element={<UserPage />}></Route>
				<Route path="/rankPage" element={<RankPage />}></Route>
				<Route path="/friendPage" element={<FriendPage />}></Route>
			</Routes>
		</React.StrictMode>
	);
}


export default App;
