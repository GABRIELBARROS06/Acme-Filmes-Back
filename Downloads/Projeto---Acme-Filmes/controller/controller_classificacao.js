/***************************************************************************
 * Objetivo: Arquivo Responsavel pela validação, consistencia de dados das requisições da API de Classificação
 * Data: 24/04/2024
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
const classDAO = require('../model/DAO/classificacao.js');

const getListarClass = async function () {
    const classJSON = {}

    let dadosClass = await classDAO.selectAllClass()

    if (dadosClass) {
        if (dadosClass.length > 0) {
            classJSON.file = dadosClass
            classJSON.quantidade = dadosClass.length
            classJSON.status_code = 200

            return classJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else
        return message.ERROR_INTERNAL_SERVER_DB //500
}

//Função para buscar um filme pelo id
const getBuscarClass = async function (id) {
    //Recebe o ID do filme
    let idClass = id
    //Cria o objeto JSON
    let classJSON = {}

    //Validação para verificar se o ID é válido
    //(vazio, indefinido, ou não numérico)
    if (idClass == '' || idClass == undefined || isNaN(idClass)) {
        return message.ERROR_INVALID_ID //400    
    } else {
        //Encaminha o ID para o DAO buscar no banco de dados
        let dadosClass = await classDAO.selectByIdClass(idClass)

        //Verifica se o DAO retornou dados
        if (dadosClass) {
            //Validação para verificar a quantidade de itens retornados
            if (dadosClass.length > 0) {
                //Cria o JSON para retorno
                classJSON.file = dadosClass;
                classJSON.status_code = 200;

                return classJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//Função para buscar um filme filtrando pelo nome
const getBuscarClassNome = async function (classificacao) {
    //variável local para facilitar a validação
    const nomeClass = classificacao
    //objeto JSON de filmes
    const classJSON = {}

    //validação do conteúdo da variável nome
    if (nomeClass == '' || nomeClass == undefined) {
        return message.ERROR_REQUIRED_FIELDS //400
    } else {
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados 
        let dadosClass = await classDAO.selectByNomeClass(nomeClass)
        //verifica se o DAO retornou dados
        if (dadosClass) {
            //validação para ver a quantidade de itens retornados
            if (dadosClass.length > 0) {
                //criação do json para retorno dos dados
                classJSON.file = dadosClass
                classJSON.status_code = 200

                return classJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setInserirNovaClass = async function (dadosClass, contentType) {


    //Validação do content-Type da requisição  
    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            //Cria o objeto JSON para devolver 
            let novoClassJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida 
            if (dadosClass.faixa_etaria == '' || dadosClass.faixa_etaria == undefined || dadosClass.faixa_etaria == null || dadosClass.faixa_etaria.length > 5 ||
                dadosClass.classificacao == '' || dadosClass.classificacao == undefined || dadosClass.classificacao == null || dadosClass.classificacao.length > 150 ||
                dadosClass.caracteristicas == '' || dadosClass.caracteristicas == undefined || dadosClass.caracteristicas == null || dadosClass.caracteristicas.length > 150
            ) {

                return message.ERROR_REQUIRED_FIELDS; //400

            }
            else {



                let validateStatus = true;


                //Validação para verificar se podemos encaminhar os dados para o DAO
                if (validateStatus) {
                    console.log(dadosClass);
                    //encaminha os dados da classificação para o DAo inserir no BD
                    let classNovo = await classDAO.insertClass(dadosClass)

                    console.log(classNovo);


                    //Validação para verificar se o DAO inseriu os dados do BD
                    if (classNovo) {
                        //Cria o JSON de retorno dos dados(201)
                        novoClassJSON.class = dadosClass;
                        novoClassJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoClassJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoClassJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoClassJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }

                }
                else {
                    return message.ERROR_NOT_FOUND //404
                }

            }
        }

    }

    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }

}

const setExcluirClass = async function (id_classificacao) {

    try {
        //id das classificações
        let idClass = id_classificacao


        if (idClass == null || idClass == undefined || idClass == '') {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {
            let dadosClass = await classDAO.deleteClass(idClass)

            console.log(dadosClass)

            if (dadosClass) {
                return message.SUCESS_DELETE_ITEM //201
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {

        return message.ERROR_INTERNAL_SERVER_DB //500

    }

}

const setAtualizarClass = async function (dadosClass, contentType, id) {

    //Validação do content-Type da requisição  
    try {

        if (String(contentType).toLowerCase() == 'application/json') {


            //Cria o objeto JSON para devolver 
            let novoClassJSON = {}



            //Validação de campos obrigatórios ou com digitação inválida 
            if (dadosClass.faixa_etaria == '' || dadosClass.faixa_etaria == undefined || dadosClass.faixa_etaria == null || dadosClass.faixa_etaria.length > 5 ||
                dadosClass.classificacao == '' || dadosClass.classificacao == undefined || dadosClass.classificacao == null || dadosClass.classificacao.length > 150 ||
                dadosClass.caracteristicas == '' || dadosClass.caracteristicas == undefined || dadosClass.caracteristicas == null || dadosClass.caracteristicas.length > 150
            ) {

                return message.ERROR_REQUIRED_FIELDS; //400

            }
            else {



                let validateStatus = true;


                //Validação para verificar se podemos encaminhar os dados para o DAO
                if (validateStatus) {
                    const idClass = dadosClass.id_classificacao = id;
                    console.log(dadosClass);
                    //encaminha os dados da classificação para o DAo inserir no BD
                    let classAtualizado = await classDAO.updateClass(dadosClass)

                    console.log(classAtualizado);


                    //Validação para verificar se o DAO inseriu os dados do BD
                    if (classAtualizado & idClass) {
                        //Cria o JSON de retorno dos dados(201)
                        novoClassJSON.class = dadosClass;
                        novoClassJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoClassJSON.class.id = Number(idClass[0].id)
                        novoClassJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoClassJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoClassJSON; //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }

                }
                else {
                    return message.ERROR_NOT_FOUND //404
                }

            }
        }

    }

    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLLER
    }

}


module.exports = {
    getBuscarClassNome,
    getBuscarClass,
    getListarClass,
    setInserirNovaClass,
    setExcluirClass,
    setAtualizarClass

}
