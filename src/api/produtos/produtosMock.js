const produtosService = require('./produtosService');

const produtos = [
    new produtosService({
        name: "Camiseta Basica Masculina - Preto",
        imgUrl: "https://static.zattini.com.br/produtos/camiseta-basica-masculina/06/FTL-0002-006/FTL-0002-006_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Camiseta Basica Masculina - Branco",
        imgUrl: "https://static.zattini.com.br/produtos/camiseta-basica-masculina/14/FTL-0002-014/FTL-0002-014_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Camiseta Basica Masculina - Azul",
        imgUrl: "https://static.zattini.com.br/produtos/camiseta-basica-masculina/08/FTL-0002-008/FTL-0002-008_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Camiseta Basica Masculina - Verde",
        imgUrl: "https://static.zattini.com.br/produtos/camiseta-basica-masculina/60/FTL-0002-060/FTL-0002-060_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Camiseta Basica Masculina - Amarelo",
        imgUrl: "https://static.zattini.com.br/produtos/camiseta-basica-masculina/30/FTL-0002-030/FTL-0002-030_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Slim Masculina - Azul Escuro",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-slim-forum-paul-masculina/25/E36-2668-325/E36-2668-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Skinny Forum Igor Masculina - Jeans",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-skinny-forum-igor-masculina/25/E36-2674-325/E36-2674-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Slim Estonada Masculina - Azul",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-slim-colcci-felipe-estonada-masculina/25/E33-8188-325/E33-8188-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Skinny Colcci Alex Masculina - Jeans",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-skinny-colcci-alex-masculina/25/E33-7861-325/E33-7861-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Skinny Colcci Masculina - Azul",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-skinny-colcci-masculina/25/E33-7862-325/E33-7862-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Colcci Skinny Alex Estonada Masculina - Azul Escuro",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-colcci-skinny-alex-estonada-masculina/25/E33-7194-325/E33-7194-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
    new produtosService({
        name: "Calça Jeans Reta Colcci Estonada Masculina - Azul Escuro",
        imgUrl: "https://static.zattini.com.br/produtos/calca-jeans-reta-colcci-estonada-masculina/25/E33-7102-325/E33-7102-325_zoom1.jpg",
        value: Math.floor(Math.random() * (100 - 10) + 10)
    }),
]

module.exports.checkDataBase = () => {
    produtosService.find({}, (err, data) => {
        if (err || data.length <= 0 || data == undefined) {
            produtos.forEach(produto => {
                produto.save()
            });
            console.log("Banco criado");
        }
    })
};