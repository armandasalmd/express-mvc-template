import express from 'express'

const router = express.Router()

// home page /
router.get('/', (req, res, next) => {
	if (req.session.authorized)
		next() // finds '/' route form user router
	else
		res.render('landing')
})

export default router