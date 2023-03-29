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
		return { completed: true, progress: 100 };
	} else {
		//returns false for completion if the number of routes logged is 0
		return { completed: false, progress: 0 };
	}
}

//At least 3 kilometers of travel logged
export async function atLeastThreeKilometersLoggedAchievement(user_Id) {
	//*Achievement ID: 3
	let getUserLoggedRoutes = await getRouteData(user_Id).catch((err) => {
		return { completed: false };
	});

	//The sum of the distance travelled based on the logged routes
	let sum = 0;
	getUserLoggedRoutes.forEach((element) => {
		sum += element.length;
	});

	//Return true with a 100% progess if the sum is more than 3 kms
	//Return false if the sum is less than 3
	//and also calculate the current progress if the latter is true
	return sum >= 3
		? console.log({ completed: true, progress: 100 })
		: console.log({ completed: false, progress: (sum / 3.0) * 100 });
}
