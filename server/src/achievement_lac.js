import { getRouteData } from "./queries.js";

//First logged route achievement
export async function firstLoggedRouteAchievement(user_Id) {
	var getUserLoggedRoutes = await getRouteData(user_Id).catch((err) => {
		//returns false for completion if the number of routes logged is 0
		return { completed: false };
	});
	if (getUserLoggedRoutes.length > 1) {
		//returns true for completion if the number of routes logged is 0
		return { completed: true };
	} else {
		//returns false for completion if the number of routes logged is 0
		return { completed: false };
	}
}
