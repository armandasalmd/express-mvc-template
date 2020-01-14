import express from 'express'
import { UserModel } from '../models'

const router = express.Router()

router.get('/login', (req, res) => {
	if (req.session.authorized) {
		req.session.authorized = false
		req.session.user = undefined
	}
	res.render('auth/login', { msg: req.query.msg, username: req.query.login })
})

router.post('/login', async (req, res) => {
	if (req.body.username && req.body.password) {
		let m = new UserModel()
		await m.login(req.body.username, req.body.password)
			.then((user) => {
				if (user) {
					req.session.authorized = true
					req.session.user = user
					res.redirect('/')
					return true
				} else {
					res.redirect(`/auth/login?msg=login%20failed&login=${req.body.username}`)
				}
			})
			.catch((err) => {
				if (err) console.log(err.messsage)
			})
	} else res.redirect('/auth/login?msg=login%20failed')
})

router.get('/register', (req, res) => {
	if (req.session.authorized) {
		req.session.authorized = false
		req.session.user = undefined
	}
	res.render('auth/register')
})

router.post('/register', (req, res) => {
	if (req.body) {
		let m = new UserModel()
		m.registerNewUser(req.body)
		res.redirect('/auth/login?msg=success')
	} else
		res.redirect('?msg=failed')
})

router.get('/reset', (req, res) => {
	if (req.session.authorized) {
		req.session.authorized = false
		req.session.user = undefined
	}
	res.render('auth/reset', { msg: req.query.msg })
})

router.post('/reset', (req, res) => {
	res.redirect('?msg=success')
})

router.get('/logout', (req, res) => {
	req.session.authorized = false
	req.session.user = undefined
	res.redirect('/auth/login')
})

export default router