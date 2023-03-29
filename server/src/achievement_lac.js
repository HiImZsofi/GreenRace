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
		? { completed: true, progress: 100 }
		: { completed: false, progress: (sum / 3.0) * 100 };
}

//Is awarded when the user has logged routes with at least 3 different vehicle types
export async function atLeastThreeDifferentTypesTravelledOn(user_Id){
	//*Achievement ID: 4
	const getUserLoggedRoutes = await getRouteData(user_Id);

	//Calculate the number of different types logged
	//The size contains the count of the types of transport
	const types = getUserLoggedRoutes.reduce((types, obj) => {
		types.add(obj.route_type);
		return types;
	}, new Set());

	//If the size is 3 or more then it returns true for the completed key's value
	//If it is less than that then returns false with the current progress
	return types.size >= 3
		? { completed: true, progress: 100 }
		: { completed: false, progress: (types.size / 3) * 100 };
}

//Is awarded when the user logs a route where the travelled distance is at least 10 kms
export async function atLeastTenKilometersInOneLog(user_Id) {
	//*Achievement ID: 8
	const getUserLoggedRoutes = await getRouteData(user_Id).catch((err) => {
		return { completed: false };
	});

	//Sets the initial status for the completion which is false
	let completedStatus = { completed: false, progress: 0 };

	getUserLoggedRoutes.forEach((route) => {
		if (route.length >= 10) {
			//Sets the completion status to true if the route l
			completedStatus = { completed: true, progress: 100 };
		}
	});
	return completedStatus;
}
