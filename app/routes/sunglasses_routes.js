const express = require('express')
const passport = require('passport')
const Sunglasses = require('../models/sunglasses')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
//const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /sunglsses
router.get('/sunglasses', (req, res, next) => {
	Sunglasses.find()
		.then((sunglasses) => {
			return sunglasses.map((sunglasses) => sunglasses.toObject())
		})
		.then((sunglasses) => res.status(200).json({ sunglasses: sunglasses }))
		.catch(next)
})

// SHOW
// GET /sunglsses/5a7db6c74d55bc51bdf39793
router.get('/sunglasses/:id', (req, res, next) => {
	Sunglasses.findById(req.params.id)
		.then(handle404)
		.then((sunglasses) => res.status(200).json({ sunglasses: sunglasses.toObject() }))
		.catch(next)
})

// CREATE
// POST /sunglasses
router.post('/sunglasses', (req, res, next) => {
	//req.body.sunglasses.owner = req.user.id
	Sunglasses.create(req.body.sunglasses)
		.then((sunglasses) => {
			res.status(201).json({ sunglasses: sunglasses.toObject() })
		})
		.catch(next)
})

// UPDATE
// PATCH /sunglsses/5a7db6c74d55bc51bdf39793
router.patch('/sunglasses/:id', removeBlanks, (req, res, next) => {
	//delete req.body.sunglasses.owner
	
	Sunglasses.findById(req.params.id)
		.then(handle404)
		.then((sunglasses) => {
			console.log('///////////FROM THE API///////// REQBODY', req.body)
			//requireOwnership(req, sunglasses)
			return sunglasses.updateOne(req.body.sunglasses)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DESTROY
// DELETE /sunglasses/5a7db6c74d55bc51bdf39793
router.delete('/sunglasses/:id', (req, res, next) => {
	Sunglasses.findById(req.params.id)
		.then(handle404)
		.then((sunglasses) => {
			//requireOwnership(req, sunglasses)
			sunglasses.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
