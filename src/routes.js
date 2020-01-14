import mainRouter from './routers/index'
import userRouter from './routers/users'
import orderRouter from './routers/orders'
import authRouter from './routers/auth'

const applyRoutes = (app) => {
	app.use(mainRouter)
	app.use(userRouter)
	app.use('/orders', orderRouter)
	app.use('/auth', authRouter)
}

export { applyRoutes }
export default applyRoutes