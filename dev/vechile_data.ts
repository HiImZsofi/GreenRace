//Imports
import fs from 'fs';
var path = require("path");
// const mysql = require('mysql')


//!connect to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'my_db'
// })
// connection.connect()


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
let vehicles = dataArray.map((line) => {
	const [model, fuelConsumption, fuelType] = line.split(';');
	return new Vehicle(model, parseInt(fuelConsumption), fuelType);
});

console.log(vehicles);

const dieselConsumption = vehicles.filter(x=>x.fuelType=='diesel\r' && x.fuelConsumption!=-1).map(v=>v.fuelConsumption)
let avg:number=0;
dieselConsumption.forEach(c => {
	avg += c;
});
console.log(avg)
avg/=dieselConsumption.length;

vehicles.filter(x=>x.fuelType='diesel\r').filter(neg=>neg.fuelConsumption=-1).map(val=> val.fuelConsumption = avg)

console.log(vehicles)

// vehicles.forEach(v => {
// 	const insertCustomer = connection.insertInto('vehicle').set({
//         model: v.model,
//         fuel_consumption: v.fuelConsumption,
//         fuel_type: v.fuelType
//     }).executeInsert(); 
// });





