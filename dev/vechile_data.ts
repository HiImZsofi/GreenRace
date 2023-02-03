//Imports
import fs from 'fs';

var path = require("path");


//!connect to database


class Vehicle{
	model:string;
	fuelConsumption:number;
	fuelType:string;

	constructor(m:string, fc:number, ft:string){
		this.model = m;
		this.fuelConsumption = fc;
		this.fuelType = ft;
	}
}

const fileData = fs.readFileSync(path.resolve(__dirname, "buses.txt"), 'utf-8');
const dataArray = fileData.split('\n');
const vehicles = dataArray.map((line) => {
	const [model, fuelConsumption, fuelType] = line.split(';');
	return new Vehicle(model, parseInt(fuelConsumption), fuelType);
});

console.log(vehicles);







