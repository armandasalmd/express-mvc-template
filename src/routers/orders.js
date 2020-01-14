import express from 'express'
import { OrderModel } from '../models'

// PREFIX: /user/
const router = express.Router()

router.get('/', (req, res) => res.send('Hello ORDERS by Armandas!'))

router.get('/hello', (req, res) => {
	let o = new OrderModel()
	res.send(o.hello())
})

export default router