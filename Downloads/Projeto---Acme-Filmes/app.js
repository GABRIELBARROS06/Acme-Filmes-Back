const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

        app.use(cors())

        next()
});

/*******************Import do arquivos da controller do projeto**********************/
const controller = require('./controller/controller_filme.js')
const controllerClass = require('./controller/controller_classificacao.js')
const controllerGenero = require('./controller/controller_genero.js')
const controllerAtor = require('./controller/controller_atores.js')
const controllerDiretor = require('./controller/controller_diretores.js')

/**********************************************************************************/

//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json();


// Versão 1.0 - retorna todos os filmes do arquivo filmes.js
app.get('/v1/acmeFilmes/ListarFilmes', cors(), async function (request, response, next) {

        let controleFilmes = require('./controller/funcoes.js')
        let listarFilmes =
                controleFilmes.getListarFilmes()

        if (listarFilmes) {
                response.status(200)
                response.json(listarFilmes)
        }
        else {
                response.status(404)
                response.json('{erro: item não encontrado}')
        }

})

// Versão 1.0 - Retorna o filme através do ID
app.get('/v1/acmeFilmes/filme/:id', cors(), async function (request, response, next) {
        let id = request.params.id

        let controleFilmes = require('./controller/funcoes.js')
        let mostrarFilme = controleFilmes.getMostrarFilme(id)

        if (mostrarFilme) {
                response.status(200)
                response.json(mostrarFilme)
        }
        else {
                response.status(404)
                response.json('{erro: item não encontrado}')
        }

})
/*******************************CRUD DE FILMES***************************************** */
//Versão 2.0 - retorna todos os arquivos do Banco de Dados
app.get('/v2/acmeFilmes/Listarfilmes', cors(), async function (request, response) {


        //Chama a função da controller para retornar os filmes
        let dadosFilmes = await controller.getListarFilmes();

        //Validação para retornar o JSON dos filmes ou retornar 404
        if (dadosFilmes) {
                response.json(dadosFilmes);
                response.status(200);
        } else {
                response.json({ Message: 'Nenhum registro foi encontrado' })
                response.status(404)
        }

})

//Criação do endpoint que retorna um filme no banco de dados filtrando pelo id 
app.get('/v2/acmeFilmes/filme/:id', cors(), async function (request, response) {
        let idFilme = request.params.id

        let dadosFilme = await controller.getBuscarFilme(idFilme)

        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
})

//Criação do endpoint que retorna dados de um filme filtrando pelo nome
app.get('/v2/acmeFilmes/nomefilme', cors(), async function (request, response) {
        let nomeFilme = request.query.nome

        let dadosFilme = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

        response.status(dadosFilme.status_code)
        response.json(dadosFilme)
})
//Criando um endpoint que cadastra um filme no banco de dados
app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function (request, response) {

        //Recebe o content-type com o tipo de dados encaminhado na requisição
        const contentType = request.header('content-type');
        console.log(contentType);

        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body

        //Encaminha os dados para o controller enviar para o DAO
        let resultDadosNovoFilme = await controller.setInserirNovoFilme(dadosBody, contentType);

        console.log(resultDadosNovoFilme)
        response.status(resultDadosNovoFilme.status_code);
        response.json(resultDadosNovoFilme);
})
//Criando um endpoint que deleta um filme pelo id
app.delete('/v2/acmeFilmes/deleteFilme/:id', cors(), async function (request, response) {

        let idFilme = request.params.id

        let dadosFilme = await controller.setExcluirFilme(idFilme)

        response.status(dadosFilme.status_code)
        response.json(dadosFilme)

})

app.put('/v2/acmeFilmes/putFilme/:id', cors(), bodyParserJSON, async function (request, response) {
        const contentType = request.header('content-type');
        console.log(contentType);

        let idFilme = request.params.id

        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body

        //Encaminha os dados para o controller enviar para o DAO
        let resultDadosNovoFilme = await controller.setAtualizarFilme(dadosBody, contentType, idFilme);

        console.log(resultDadosNovoFilme)
        response.status(resultDadosNovoFilme.status_code);
        response.json(resultDadosNovoFilme);
})

/*****************************CRUD DE CLASSIFICAÇÃO*************************** */
//Criação do endpoint que lista todas as classificações presentes no DB
app.get('/v2/acmeFilmes/Listarclass', cors(), async function (request, response) {


        //Chama a função da controller para retornar os filmes
        let dadosClass = await controllerClass.getListarClass();

        //Validação para retornar o JSON dos filmes ou retornar 404
        if (dadosClass) {
                response.json(dadosClass);
                response.status(dadosClass.status_code);
        } else {
                response.json({ Message: 'Nenhum registro foi encontrado' })
                response.status(404)
        }

})
//Criação do endpoint que busca os dados da classificação, filtrando pelo ID
app.get('/v2/acmeFilmes/class/:id', cors(), async function (request, response) {
        let idClass = request.params.id

        let dadosClass = await controllerClass.getBuscarClass(idClass)

        response.status(dadosClass.status_code)
        response.json(dadosClass)
})

//Criação do endpoint que retorna dados de uma class filtrando pela faixa etaria
app.get('/v2/acmeFilmes/nomeClass', cors(), async function (request, response) {
        let nomeClass = request.query.faixa_etaria

        let dadosClass = await controllerClass.getBuscarClassNome(nomeClass)

        response.status(dadosClass.status_code)
        response.json(dadosClass)
})

//Crição de um endpoint que adiciona uma nova Classificação ao DB
app.post('/v2/acmeFilmes/classNova', cors(), bodyParserJSON, async function (request, response) {

        const contentType = request.header('content-type');
        console.log(contentType);

        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body

        let resultDadosNovoClass = await controllerClass.setInserirNovaClass(contentType, dadosBody);

        console.log(resultDadosNovoClass)
        response.status(resultDadosNovoClass.status_code)
        response.json(resultDadosNovoClass)

})

app.delete('/v2/acmeFilmes/deleteClass/:id', cors(), async function (request, response) {

        let idClass = request.params.id

        let dadosClass = await controllerClass.setExcluirClass(idClass)

        response.status(dadosClass.status_code)
        response.json(dadosClass)


})
app.put('/v2/acmeFilmes/updateClass/:id', cors(), bodyParserJSON, async function (request, response) {
        const contentType = request.header('content-type');
        console.log(contentType);

        let idClass = request.params.id

        // Recebe todos os dados encaminhados na requisição pelo body        
        let dadosBody = request.body

        let resultDadosNovoClass = await controllerClass.setAtualizarClass(dadosBody, contentType, idClass);

        console.log(resultDadosNovoClass)
        response.status(resultDadosNovoClass.status_code)
        response.json(resultDadosNovoClass)
})
/*****************************CRUD DE GENERO******************************* */
app.post('/v2/acmeFilmes/novoGenero', cors(), bodyParserJSON, async function (request, response) {

        const contentType = request.header('content-type');
        console.log(contentType)

        let dadosBody = request.body

        let resultDadosNovoGenero = await controllerGenero.setInserirFilme(contentType, dadosBody)

        console.log(resultDadosNovoGenero)
        response.status(resultDadosNovoGenero.status_code)
        response.json(resultDadosNovoGenero)

})
/*****************************CRUD DE ATOR********************************* */
app.get('/v2/acmeFilmes/ListarAtor', cors(), async function (request, response) {
        let dadosAtor = await controllerAtor.getListarAtor();

        //Validação para retornar o JSON dos filmes ou retornar 404
        if (dadosAtor) {
                response.json(dadosAtor);
                response.status(dadosAtor.status_code);
        } else {
                response.json({ Message: 'Nenhum registro foi encontrado' })
                response.status(404)
        }

})

app.get('/v2/acmeFilmes/BuscarAtor/:id', cors(), async function (request, response) {
        let idAtor = request.params.id

        let dadosAtor = await controllerAtor.getBuscarIdAtor(idAtor)

        response.status(dadosAtor.status_code)
        response.json(dadosAtor)
})

app.get('/v2/acmeFilmes/nomeAtor', cors(), async function (request, response) {
        let nomeAtor = request.query.nome

        let resultDadosNovoAtor = await controllerAtor.getBuscarNomeAtor(nomeAtor);

        response.status(resultDadosNovoAtor.status_code)
        response.json(resultDadosNovoAtor)

})

app.post('/v2/acmeFilmes/insertAtor', cors(), bodyParserJSON, async function (request, response) {

        let contentType = request.headers['content-type'];
        console.log(contentType)


        let dadosBody = request.body

        let resultDadosNovoAtor = await controllerAtor.setInserirNovoAtor(dadosBody, contentType);
       
        response.status(resultDadosNovoAtor.status_code)
        response.json(resultDadosNovoAtor)
       
})

app.put('/v2/acmeFilmes/updateAtor/:id', cors(), bodyParserJSON, async function (request, response) {

        const contentType = request.headers['content-type'];
        console.log(contentType)

        let id = request.params.id

        const dadosBody = request.body

        let resultDadosNovoAtor = await controllerAtor.setAtualizarAtor(id, dadosBody, contentType);

 
        console.log(resultDadosNovoAtor)
        response.status(resultDadosNovoAtor.status_code)
        response.json(resultDadosNovoAtor)

})

app.delete('/v2/acmeFilmes/deleteAtor/:id', cors(), async function (request, response){

   let idAtor = request.params.id

   let resultDadosNovoAtor = await controllerAtor.setExcluirAtor(idAtor)

   response.status(resultDadosNovoAtor.status_code)
   response.json(resultDadosNovoAtor)

})
/****************************CRUD DE DIRETOR**************************************/
app.get('/v2/acmeFilmes/ListarDiretor', cors(), async function(request, response){
        let dadosDiretor = await controllerDiretor.getListarDiretor();

        if(dadosDiretor){
                response.json(dadosAtor);
                response.status(dadosAtor.status_code);
        } else{
                response.json({ Message: 'Nenhum registro foi encontrado' })
                response.status(404)
        }
})

app.get('/v2/acmeFilmes/BuscarDiretor/:id', cors(), async function(request, response){
        const idDiretor = request.params.id
        
        let dadosDiretor = await controllerDiretor.getBuscarIdDiretor(idDiretor);

        if(dadosDiretor){
                response.json(dadosDiretor)
                response.status(dadosDiretor.status_code)
        } else {
                response.json({Message: 'Nenhum registro foi encontrado'})
                response.status(440)
        }
})
app.get('/v2/acmeFilmes/nomeDiretor', cors(), async function(request, response){
        const nomeDiretor = request.query.nome

        let dadosDiretor = await controllerDiretor.getBuscarNomeDiretor(nomeDiretor)

        if(dadosDiretor){
                response.json(dadosDiretor)
                response.status(dadosDiretor.status_code)
        } else {
                response.json({Message: 'Nenhum registro foi encontrado'})
                response.status(440)
        }
})
//Endpoint criado para ligar a API
app.listen('8080', function () {
        console.log('API funcionando e aguardando requisições!!!!')
})