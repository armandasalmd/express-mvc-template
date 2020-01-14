import express from 'express'

// PREFIX: /user/
const router = express.Router()

router.get('/', function (req, res) {
	if (req.session.authorized) {
		res.render('users/home', { user: req.session.user })
	} else {
		res.redirect('/auth/login?msg=please%20login')
	}
})

export default router