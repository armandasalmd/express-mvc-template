import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 100
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: [(email) => {
			return email.includes('@')
		}, 'Invalid email address provided']
	},
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	phone_no: {
		type: String,
		required: false
	},
	account_type: String,
	address: {
		street: String,
		city: String,
		postcode: String
	}
}, { collection: 'users' })

userSchema.methods.generatePasswordHash = async function() {
	const saltRounds = 5
	return await bcrypt.hash(this.password, saltRounds)
}

userSchema.methods.validatePassword = async function(password) {
	return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function() {
	this.password = await this.generatePasswordHash()
})

userSchema.virtual('fullname')
	.get(() => {
		return `${this.firstname} ${this.lastname}`
	})
	.set((v) => {
		this.name.first = v.substr(0, v.indexOf(' '));
		this.name.last = v.substr(v.indexOf(' ') + 1);
	});

export default userSchema