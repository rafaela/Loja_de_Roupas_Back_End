const Produtos = require('./produtos')

Produtos.methods(['get', 'post', 'put', 'delete'])
Produtos.updateOptions({new: true, runValidators: true})

module.exports = Produtos