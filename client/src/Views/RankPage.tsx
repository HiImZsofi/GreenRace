import React, { useState, useEffect } from "react";
import "./Pages.css";
import NavMenu from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { UserPageDto } from "../Interfaces";
import { Navigate } from "react-router-dom";
interface Ranking {
	username: string;
	points: number;
}
const Ranglist: Ranking[] = [];
const RankPage = () => {
	const [username, setUsername] = useState("");
	const [picFilePath, setPicFilePath] = useState("");
	const [points, setPoints] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const logoutHandler = () => {
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};
		fetch("http://localhost:3001/logout", requestOptions)
			.then(async (response) => {
				const isJson = response.headers
					.get("content-type")
					?.includes("application/json");
				const data = isJson && (await response.json());
				if (response.status == 200) {
					setIsLoggedIn(!isLoggedIn);
				}
			})

			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	const loadInData = () => {
		fetch("http://localhost:3001/userPage")
			.then(async (response) => {
				const isJson = response.headers
					.get("content-type")
					?.includes("application/json");
				const data = isJson && (await response.json());
				console.log(data);
				setUsername(data.userdata.username);
				setPicFilePath(data.userdata.picfilepath);
				setPoints(data.userdata.points);
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	const loadInRankData = () => {
		fetch("http://localhost:3001/rankPage")
			.then(async (response) => {
				const isJson = response.headers
					.get("content-type")
					?.includes("application/json");
				const rankdata = isJson && (await response.json());
				console.log(rankdata);
				for (let i = 0; i < 10; i++) {
					if (rankdata.ranking[i] !== undefined) {
						let username: string = rankdata.ranking[i].username;
						let points = rankdata.ranking[i].points;
						let rang: Ranking = { username: username, points: points };
						Ranglist[i] = rang;
					}
				}
			})
			.catch((error) => {
				console.error("There was an error!", error);
			});
	};
	useEffect(() => {
		loadInData();
		loadInRankData();
	});
	if (isLoggedIn) {
		return <Navigate to="/login" replace={true} />;
	} else {
		return (
			<div key={"rankPage"}>
				<NavMenu
					username={username}
					picfilepath={picFilePath}
					logoutHandler={logoutHandler}
				/>
				<div className="text-center mt-3">
					<div>
						<h1>Rang Lista:</h1>
						<ul>
							{Ranglist.map((Ranking, i) => (
								<li key={i}>
									{i + 1}. {Ranking.username}:{Ranking.points}p
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

export default RankPage;
