import { connect } from 'mongoose';
connect('mongodb://localhost:27017/admindashboard', {});

import messageModel from '../models/message.model';
import userModel from '../models/user.model';

async function seed() {
	let jane = await userModel.create({
		phone: '+88123456789',
		telegram: '6497786721',
		name: 'John Doe',
		username: 'johndoe'
	});
	
	let jhon = await userModel.create(
		{
			phone: '+88123456789',
			telegram: '1234567892',
			name: 'Sam Smith',
			username: 'samsmith',
			note: 'very good person, good personality, good attitude, good everything, and please trust him, he is a good person, and he is a good friend, and hes a good worker'
		}
	)
	let loh = await userModel.create(
		{
			phone: '+88123456789',
			telegram: '1234567893',
			name: 'Loh Loh',
			username: 'loh22'
		}
	);
	let bill = await userModel.create(
		{
			phone: '+88123356789',
			telegram: '1234567894',
			name: 'Bill Bob',
			username: 'billbob',
			note: 'good person, good personality, good attitude, good everything, and please trust him, he is a good person, and he is a good friend, and hes a good worker'
		}
	);
	let sol = await userModel.create(
		{
			phone: '+88123356789',
			telegram: '1234567895',
			name: 'Sol Sol',
			username: 'sol22'
		}
	);
	let som = await userModel.create(
		{
			phone: '+88123356789',
			telegram: '1234567896',
			name: 'Som Som',
			username: 'som22'
		}
	);
	let tom = await userModel.create(
		{
			phone: '+88123356789',
			telegram: '1234567897',
			name: 'Tom Tom',
			username: 'tom22',
			note: 'good person, good personality, good attitude, good everything, and please trust him, he is a good person, and he is a good friend, and hes a good worker'
		}
	);
	let tim = await userModel.create(
		{
			phone: '+88123356789',
			telegram: '1234567898',
			name: 'Tim Tim',
			username: 'tim22',
			note: 'very bad person, bad personality, bad attitude, bad everything, and please do not trust him, he is a liar, and he is a thief, and he is a criminal, and he is a killer!'
		}
	);

	let mes1 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'hey this is user!',
			user: true
		}
	});
	let mes2 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'privet eto admin !',
			user: false
		}
	});
	let mes3 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'i want to buy something!',
			user: true
		}
	});
	let mes4 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'chto vas interesuet!',
			user: false
		}
	});
	let mes5 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'carpets for my new car!',
			user: true
		}
	});
	let mes6 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'konechno bez problem dostabim cheres 33 minuti',
			user: false
		}
	});
	let mes7 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'thank you admin!',
			user: true
		}
	});
	let mes8 = [ bill, loh, jhon, jane, sol, som, tom, tim ].map((user) => {
		return {
			userId: user._id,
			message: 'no problema user!!!!',
			user: false
		}
	});

	await messageModel.insertMany(await Promise.all(mes1.concat(mes2, mes3, mes4, mes5, mes6, mes7, mes8)));
}


seed().then(() => {
	console.log('Data seeded successfully');
	process.exit(0);
}).catch((err) => {
	console.error(err);
	process.exit(1);
});