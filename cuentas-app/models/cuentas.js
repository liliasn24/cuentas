const { model, Schema } = require('mongoose');

const cuentaSchema = new Schema ({
  amount: Number,
  for: String,
}, {
  timeStamos: true
})

module.export = model("Cuenta", cuentaSchema )
