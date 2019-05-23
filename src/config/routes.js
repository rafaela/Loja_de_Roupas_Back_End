const express = require('express')
const pageChatService = require('../api/pageChat/pageChatService')
const produtosServices = require('../api/produtos/produtosService')
const chatBot = require('../api/chatbot/chatbot')

module.exports = function(server){

    const openApi = express.Router()
    server.use('/api', openApi)

    // pageChat Routes
    openApi.post('/page_chat', (req, res, next) => {

        if (!req.body.message) {
            res.status(403).send({ errors: ['No message provided.'] })
            return;
        }

        chatBot.analisarResponderMensagem({
            session_id: req.body.contextId,
            message: {
                text: req.body.message || undefined
            }
        })
            .then(([user, response]) => {

                response.output.text.forEach(message => {
                    user.messages.push({
                        message: message,
                        base: 'received'
                    });
                });

                user.save((err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        res.status(201).json(user);
                    }
                })
            })
    })

    pageChatService.register(openApi,'/page_chat')
    produtosServices.register(openApi, '/produtos')
}