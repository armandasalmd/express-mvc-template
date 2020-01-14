import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	order_id: {
		type: String,
		unique: true,
		required: true
	},
	user_id: {
		type: String,
		unique: true,
		required: true
	},
	technician_id: {
		type: String,
		unique: true,
		required: true
	},
	appliance_type: String,
	appliance_age: Number,
	appliance_manufacturer: String,
	issue: {
		type: String,
		required: true,
		default: 'No issue provided'
	},
	status: String,
	quotes: [{
		description: String,
		price: {
			currency: String,
			amount: Number
		},
		status: String,
		date_created: Date,
		accepted: Boolean
	}]
}, { collection: 'orders' })

export default orderSchema