const mongoose = require('mongoose')

const {Schema, model } = mongoose

const sunglassesSchema = new Schema(

	{
		brand: {
			type: String,
			required: true,
		},
		frameColor: {
			type: String,
			required: true,
		},
		isPolarized: {
			type: Boolean,
			required: true
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

module.exports = model('sunglasses', sunglassesSchema)
