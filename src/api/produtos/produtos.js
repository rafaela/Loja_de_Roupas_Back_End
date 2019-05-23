const restful = require('node-restful')
const mongoose = restful.mongoose

const produtosSchema = new mongoose.Schema({
    name: { type: String, required: true},
    imgUrl: { type: String, required: true},
    value: { type: Number, min: 1, required: true}
})

module.exports = restful.model('Produtos', produtosSchema)