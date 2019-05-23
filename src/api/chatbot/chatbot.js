require('dotenv').config()
const watson = require('watson-developer-cloud');
const pageChatService = require('../pageChat/pageChatService')
const ProdutosService = require('../produtos/produtosService')

// Configuração do asistente do IBM Watson
const assistant = new watson.AssistantV1({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: process.env.WATSON_URL,
    version: process.env.WATSON_VERSION
});

construirCenario = (input) => new Promise((resolve, reject) => {
    pageChatService.find({ contextId: input.contextId }, (err, data) => {
        if (err || data.length == 0 || data == undefined) {

            let pageChat = new pageChatService({
                input: input.message || undefined,
                session_id: undefined,
            });
            pageChat.session_id = pageChat._id;

            resolve(pageChat);
        }
        else {
            pageChat = data[0];
            pageChat.input = input.message || undefined,
                resolve(pageChat);
        }
    })
});

detectarProduto = (response) => new Promise((resolve, reject) => {
    console.log(response);
    allSearchs = []
    if (response.intents.length > 0 && response.intents[0].intent == 'Comprar') {
        for (let index = 0; index < response.entities.length; index++) {
            if (response.entities[index].entity == 'produto') {
                let search;
                if (index + 1 < response.entities.length) {
                    search = response.input.text.substring(
                        response.entities[index].location[0],
                        response.entities[index + 1].location[0]
                    )
                }
                else {
                    search = response.input.text.substring(
                        response.entities[index].location[0]
                    )
                }
                allSearchs.push(new Promise((resolve, reject) => {
                    ProdutosService.find({ "name": { "$regex": search.trim(), "$options": "i" } }, (err, data) => {
                        if (err || data.length == 0 || data == undefined) {
                            response.output.text[0] += ", Este outro produto não foi encontrado.";
                            resolve(response);
                        }
                        else {
                            response.context.hasOwnProperty("itens") && response.context.itens != '' ? response.context.itens.push(data[0]) : response.context.itens = [data[0]];
                            response.output.text[0] += ` ${data[0].name}, `;
                            resolve(response);
                        }
                    });
                }));
            }
        }
        Promise.all(allSearchs).then((res) => {
            resolve(response);
        });
    }
    else if (response.intents.length > 0 && response.intents[0].intent == 'ver_carrinho') {
        if (response.context.hasOwnProperty("itens") && response.context.itens != '') {
            response.output.text[0] += ` Eles são: ${response.context.itens.map(item => item.name).join(', ')}`;
        }
        resolve(response);
    }
    else if (response.intents.length > 0 && response.intents[0].intent == 'remover_carrinho') {
        let tem_numero = false;
        if (response.context.hasOwnProperty("itens") && response.context.itens != '') {
            response.entities.forEach(entity => {
                if (entity.entity == 'sys-number') {
                    let pos = parseInt(entity.value);
                    response.context.itens.splice(pos-1, 1);
                    tem_numero = true;                }
            });
        }
        else {
            response.output.text[0] = "Não tem nada no seu carrinho!";
        }

        if (!tem_numero) {
            response.output.text[0] = "Você precisa me informar um número";
        }

        resolve(response);
    }
    else {
        resolve(response);
    }
});

module.exports.analisarResponderMensagem = (input) => new Promise((resolve, reject) => {
    construirCenario(input).then((user) => {
        // envia ao watson a sessão do usuário
        assistant.message({
            workspace_id: process.env.WATSON_WORKSPACE_ID,
            session_id: user.session_id,
            context: user.context,
            input: user.input
        },
            (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    detectarProduto(res).then((resp) => {

                        user.messages.push({
                            message: input.message.text
                        });

                        // Armazena o fluxo de contexto da conversação que foi obtida como respota do watson na sessão do usuário.
                        user.context = res.context;
                        user.save()

                        resolve([user, res]);
                    });
                }
            });
    })
});