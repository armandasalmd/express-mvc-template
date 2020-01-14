// This file contains:
// Function to connect to the server
// Export a collection of models imported from other files

import mongoose, { model } from 'mongoose'

// import model classes here!
import UserModel from './user'
import OrderModel from './order'

const connectToDatabase = (url) => {
	if (!url) {
		url = process.env.DATABASE_URL || 'mongodb://localhost/dr'
	}
	var db
	try {
		// creating a connection
		mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
		db = mongoose.connection
		// binding event listeners
		db.on('error', console.error.bind(console, 'connection error'))
		db.once('open', () => {
			console.log('connected to database!')
		})

	} catch (err) {
		console.error(err.message)
	}
	return db
}

export { connectToDatabase, UserModel, OrderModel }
export default { UserModel, OrderModel }