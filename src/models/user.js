import userSchema from '../schemas/user'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export default class UserModel {
	constructor() {
		// Compiling mongoose schema
		this.model = mongoose.model('usera', userSchema)
		// Create model instances by: const m = new this.model()
	}

	// returns mongoose model
	getOriginalModel() {
		return this.model
	}

	// register a user with a provided details
	/*async registerNewUser2(userObject) {
		if (userObject) {
			// console.log('USER REGISTERED!!')
			const saltRounds = 5
			userObject.password = await bcrypt.hash(userObject.password, saltRounds)

			this.model.insertMany([userObject])
				.catch((err) => {
					console.log(err.message)
				})
		} else
			throw new Error('Empty userObject provided! Register failed')
	}*/

	// register a user with a provided details
	async registerNewUser(userObject) {
		if (userObject) {
			// console.log('USER REGISTERED!!')
			/*const saltRounds = 5
			userObject.password = await bcrypt.hash(userObject.password, saltRounds)*/

			const user = new this.model(userObject)
			user.save((err, doc) => {
				if (err)
					console.log(err.message)
				else
					console.log('Saved success')
			})
		} else
			throw new Error('Empty userObject provided! Register failed')
	}

	async login(username, password) {
		if (username && password) {
			const user = await this.model.findOne(
				{ username: username },
				{ __v: 0, _id: 0, phone_no: 0 },
				async function (err, doc) {
					if (err)
						console.log(err.message)
				}
			)
			const isPassCorrect = await bcrypt.compare(password, user.password)
			if (isPassCorrect) {
				const docJSON = JSON.parse(JSON.stringify(user))
				let { password, ...rest } = docJSON
				return rest
			} else return false
		} else return false
	}
}
