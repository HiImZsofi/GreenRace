import { getRouteData } from "./queries.js";

//First logged route achievement
export async function firstLoggedRouteAchievement(user_Id) {
	//*Achievement ID: 2
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

//At least 3 kilometers of travel logged
export async function atLeastThreeKilometersLoggedAchievement(user_Id) {
	//*Achievement ID: 3
	let getUserLoggedRoutes = await getRouteData(user_Id).catch((err) => {
		return { completed: false };
	});
	let sum = 0;
	getUserLoggedRoutes.forEach((element) => {
		sum += element.length;
	});
	return sum >= 3
		? console.log({ completed: true, progress: 100 })
		: console.log({ completed: false, progress: (sum / 3.0) * 100 });
}
