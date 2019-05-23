const PageChat = require('./pageChat')

PageChat.methods(['get', 'post', 'put', 'delete'])
PageChat.updateOptions({new: true, runValidators: true})

module.exports = PageChat