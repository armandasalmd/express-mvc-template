import orderSchema from '../schemas/order'
import mongoose from 'mongoose'

export default class OrderModel {
	constructor() {
		// Compiling mongoose schema
		this.model = mongoose.model('order', orderSchema)
	}

	// returns mongoose model
	getOriginalModel() {
		return this.model
	}

	// hello world method
	hello() {
		console.log('Hello world!')
		return 'Hello world!'
	}
}

/*const Order = mongoose.model('order', orderSchema)
export default Order*/