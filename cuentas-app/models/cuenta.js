const { model, Schema } = require('mongoose');

const cuentaSchema = new Schema(
	{
		amount: Number,
		for: String
	},
	{
		timestamps: true
	}
);

module.exports = model('Cuenta', cuentaSchema);
