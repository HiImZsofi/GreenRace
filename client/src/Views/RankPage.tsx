import React from "react";
import "./Pages.css";
import NavMenu from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import { UserPageDto } from "../Interfaces";
import { Navigate } from "react-router-dom";
interface Ranking {
	username:string;
	points:number;		
}
const Ranglist: Ranking[] = [];
class RankPage extends React.Component<{}, UserPageDto> {
	constructor(props: any) {
		super(props);
		this.logoutHandler = this.logoutHandler.bind(this);
		//Initalize state variables
		this.state = {
			username: "",
			picfilepath: "",
			points: 0,
			//This can be set to true because it should only be on pages when you are logged in
			isLoggedIn: true,
		};
	}
	//Navbar Logout-Button's Onclick Function
	logoutHandler() {
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
					this.setState({
						isLoggedIn: false,
					});
				}
			})

			.catch((error) => {
				console.error("There was an error!", error);
			});
	}
	//Loading In The Users Data
	loadInData(){
		fetch("http://localhost:3001/userPage")
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				?.includes("application/json");
			const data = isJson && (await response.json());
			console.log(data);
			this.setState({username: data.userdata.username});
			this.setState({picfilepath: data.userdata.picfilepath});
			this.setState({points: data.userdata.points});
		})
		.catch((error) => {
			console.error("There was an error!", error);
		});
	}
	loadInRankData(){
		fetch("http://localhost:3001/rankPage")
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				?.includes("application/json");
				const rankdata = isJson && (await response.json());
				console.log(rankdata);
				for (let i = 0; i < 10; i++){
					if(rankdata.ranking[i] !== undefined){
						let username:string = rankdata.ranking[i].username;
						let points = rankdata.ranking[i].points;
						let rang:Ranking = {username: username, points: points}
						Ranglist[i] = rang;
					}			
				}			
		})
		.catch((error) => {
			console.error("There was an error!", error);
		});
	}
	componentDidMount(){	
		this.loadInData()
		this.loadInRankData()
	}
	//Rendering Page
	render(): React.ReactNode {
		if (!this.state.isLoggedIn) {
			return <Navigate to="/login" replace={true} />;
		} else {
		return (
			<div key={"rankPage"}>
				<NavMenu username={this.state.username} picfilepath={this.state.picfilepath} logoutHandler={this.logoutHandler}/>
				<div className="text-center mt-3">
					<div>
						<h1>Rang Lista:</h1>
						<ul>
							{Ranglist.map((Ranking,i) => (
								<li key={i}>{i+1}. {Ranking.username}:{Ranking.points}p</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}}
}
export default RankPage;
