//imports
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Login";
import Grid from "@mui/material/Grid";
import { response } from 'express';
import {  BrowserRouter as Router,  Routes,  Route,  Link, BrowserRouter  } from 'react-router-dom';
import UserPage from './userPage';
import RankPage from './rankPage';
import FriendPage from './friendPage';

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
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item xs={3}>
					<RouterProvider router={router} />
				</Grid>
			</Grid>
			<Routes>
        <Route path="/userPage" element={<UserPage />}>
        </Route>
        <Route path="/rankPage" element={<RankPage />}>
        </Route>
        <Route path="/friendPage" element={<FriendPage />}>
        </Route>
      </Routes>
		</React.StrictMode>
	);
}


export default App;
