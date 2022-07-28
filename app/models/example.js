const mongoose = require('mongoose')

const {Schema, model } = mongoose

const sunGlassesSchema = new Schema(

	{
		brand: {
			type: String,
			required: true,
		},
		frameColor: {
			type: String,
			required: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Example', exampleSchema)
