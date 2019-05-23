const restful = require('node-restful')
const mongoose = restful.mongoose

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    base: { type: String, default: 'sent' },
    sendAt: { type: Date, default: Date.now }
})

const pageChatSchema = new mongoose.Schema({
    session_id: { type: String, required: true },
    context: {},
    userName: { type: String },
    input: {},
    messages: [messageSchema]
})

module.exports = restful.model('PageChat', pageChatSchema)
