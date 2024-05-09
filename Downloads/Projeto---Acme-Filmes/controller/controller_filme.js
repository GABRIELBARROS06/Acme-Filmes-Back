/***************************************************************************
 * Objetivo: Arquivo Responsavel pela validação, consistencia de dados das requisições da API de Filme
 * Data: 08/05/2024
 * Autor: Gabriel de Barros
 * Versão: 1.0
 **************************************************************************/
/*
*Para realizar o acesso a Banco de Dados prcisamos instalar algumas bibliotecas:
*    -SEQUELIZE - É uma biblioteca mais antiga
*    -PRISMA ORM - É a biblioteca mais atual (será utilizado)
*    -FASTFY ORM - É a biblioteca mais atual
*
*     Para instalar o PRISMA:
   - npm install prisma --save (Irá realizar a conexão com o BD)
   - npm install @prisma/client --save (Irá executar os scripts SQL no BD)
 */

// Import do arquivo de configuração do projeto
const message = require('../module/config.js')

//Import do arquivo DAO que fará a comunicação com o Banco de Dados   
const filmeDAO = require('../model/DAO/filme.js');

//Função para validar e inserir novo filme
const setInserirNovoFilme = async function (id, dadosFilme, contentType) {

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

              //Cria o objeto JSON para devolver 
            let filmeJSON = {}


            //Validação de campos obrigatórios ou com digitação inválida 
            if (dadosFilme.nome == ''              || dadosFilme.nome == null                    || dadosFilme.nome == undefined                          || dadosFilme.length > 200 ||
                dadosFilme.sinopse == ''           || dadosFilme.sinopse == null                 || dadosFilme.sinopse == undefined                       || dadosFilme.length > 500 ||
                dadosFilme.duracao == ''           || dadosFilme.duracao == null                 || dadosFilme.duracao == undefined                       || dadosFilme.length > 30  ||
                dadosFilme.data_lancamento == ''   || dadosFilme.data_lancamento == null         || dadosFilme.data_lancamento == undefined               || dadosFilme.length > 20  ||
                dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == null       || dadosFilme.data_relancamento == undefined             || dadosFilme.length > 20  ||
                dadosFilme.foto_capa == ''         || dadosFilme.foto_capa == null               || dadosFilme.foto_capa == undefined                     || dadosFilme.length > 100  ||
                dadosFilme.valor_unitario == ''    || dadosFilme.valor_unitario == null          || dadosFilme.valor_unitario == undefined                || dadosFilme.length > 10  

            ) {
                return message.ERROR_REQUIRED_FIELDS //400

            }
            else {
                let validadeStatus = true

                if (validadeStatus) {
                    dadosFilme.id = id;
                   
                    let filmeNovo = await filmeDAO.insertFilme(id, dadosFilme)
                    
                    


                    if (filmeNovo) {
                        filmeJSON.file = dadosFilme
                        filmeJSON.id = 'Id editado' + id
                        filmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        filmeJSON.status = message.SUCCESS_CREATED_ITEM.status
                        filmeJSON.message = message.SUCCESS_CREATED_ITEM.message


                        return filmeJSON //201

                    }
                    else {
                        console.log("toioooou");
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            console.log("salbeee");
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }

}



//Função para atualizar os filmes
const setAtualizarFilme = async function (id, dadosFilme, contentType) {
   try{
   
    if (String(contentType).toLowerCase() == 'application/json') {



        //Cria o objeto JSON para devolver 
        let novoFilmeJSON = {}

        //Validação de campos obrigatórios ou com digitação inválida 
        if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
            dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
            dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
            dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length > 10 ||
            dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa.length > 200 ||
            dadosFilme.valor_unitario.length > 6
        ) {

            return message.ERROR_REQUIRED_FIELDS; //400

        }
        else {

            let validateStatus = false;


            //Validação da data de relancamento, já que ela não obrigatória no BD
            if (dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != undefined) {

                //Validação para verificar se a data esta com a qtde de digitos correto    
                if (dadosFilme.data_lancamento.length != 10) {
                    return message.ERROR_REQUIRED_FIELDS; //400

                } else {
                    validateStatus = true;
                }
            } else {
                validateStatus = true;
            }

           

            //Validação para verificar se podemos encaminhar os dados para o DAO
            if (validateStatus) {
                dadosFilme.id = id;
                  //encaminha os dados do gilme para o DAo inserir no BD
                let filmeAtualizado = await filmeDAO.updateFilme(dadosFilme)
             

                //Validação para verificar se o DAO inseriu os dados do BD
                if (filmeAtualizado) {
                    //Cria o JSON de retorno dos dados(201)
                    novoFilmeJSON.filme = dadosFilme
                    novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM.status;
                    novoFilmeJSON.id = 'O id do filme é: ' + id
                    novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                    novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message;

                    return novoFilmeJSON; //201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }

            }
            else{
                return message.ERROR_NOT_FOUND //404
            }

        }
    }


} catch (error) {
    return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLE
}



}




//Função para excluir os filmes
const setExcluirFilme = async function (id) {

    try{
    //id do filmes
    let idFilme = id



    if(idFilme == '' || idFilme == undefined || idFilme == null ){
        return message.ERROR_REQUIRED_FIELDS; //400
    } else{

        let dadosFilme = await filmeDAO.deleteFilme(idFilme);


    if(dadosFilme){
        return message.SUCESS_DELETE_ITEM
    } else{
        return message.ERROR_INTERNAL_SERVER_DB
    }

    }
}catch(error) {
    return message.ERROR_INTERNAL_SERVER
}
}


const getListarFilmes = async function () {
    const filmesJSON = {}

    let dadosFilmes = await filmeDAO.selectAllFilmes()

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJSON.file = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else
        return message.ERROR_INTERNAL_SERVER_DB //500
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function (id) {
    //Recebe o ID do filme
    let idFilme = id
    //Cria o objeto JSON
    let filmesJSON = {}

    //Validação para verificar se o ID é válido
    //(vazio, indefinido, ou não numérico)
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400    
    } else {
        //Encaminha o ID para o DAO buscar no banco de dados
        let dadosFilme = await filmeDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if (dadosFilme) {
            //Validação para verificar a quantidade de itens retornados
            if (dadosFilme.length > 0) {
                //Cria o JSON para retorno
                filmesJSON.file = dadosFilme;
                filmesJSON.status_code = 200;

                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//Função para buscar um filme filtrando pelo nome
const getBuscarFilmeNome = async function (nome) {
    //variável local para facilitar a validação
    const nomeFilme = nome
    //objeto JSON de filmes
    const filmesJSON = {}

    //validação do conteúdo da variável nome
    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_REQUIRED_FIELDS //400
    } else {
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados 
        let dadosFilme = await filmeDAO.selectByNomeFilme(nomeFilme)
        //verifica se o DAO retornou dados
        if (dadosFilme) {
            //validação para ver a quantidade de itens retornados
            if (dadosFilme.length > 0) {
                //criação do json para retorno dos dados
                filmesJSON.file = dadosFilme
                filmesJSON.status_code = 200

                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {

    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmeNome
}
