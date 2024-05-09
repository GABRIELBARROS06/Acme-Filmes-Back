/***********************************************************************************************************
 * Objetivo:Arquivo responsável  pela validação, consistencia de dados das requisições da API de Atores
 * Data:24/04/2024
 * Criador:Gabriel de Barros Gomes
 * Versão:1.0
 ***********************************************************************************************************/

const message = require('../module/config.js');

const diretorDAO = require('../model/DAO/diretor.js');

//Função para listar todos os diretores, presentes no DB
const getListarDiretor = async function () {

    const diretorJSON = {}

    let dadosDiretor = await diretorDAO.selectAllDiretor()

    if (dadosDiretor) {
        if (dadosAtor.length > 0) {
            diretorJSON.file = dadosDiretor
            diretorJSON.quantidade = dadosDiretor.length
            diretorJSON.status_code = 200

            return diretorJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER//500
    }


}

//Função para buscar um diretor, filtrando pelo ID
const getBuscarIdDiretor = async function (id_diretor) {

    let idDiretor = id_diretor

    const diretorJSON = {}

    if (idDiretor == '' || isNaN(idDiretor) || idDiretor == null) {
        return message.ERROR_NOT_FOUND //404
    }

    else {
        let dadosDiretor= await diretorDAO.selectByIdDiretor(idDiretor);


        if (dadosDiretor) {
            if (dadosDiretor.length > 0) {
                diretorJSON.file = dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            }
            else {
                return message.ERROR_NOT_FOUND //404
            }
        }

        else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }

    }

}
//Função para buscar um ator filtrando pelo nome
const getBuscarNomeDiretor = async function (nome) {

    //Variável local para facilitar a validação
    const nomeDiretor = nome

    //objeto JSON de Ator
    const diretorJSON = {}

    //validação do conteúdo da variavel nome
    if (nomeDiretor == '' || nomeDiretor == undefined) {

        return message.ERROR_REQUIRED_FIELDS //400
    }
    else {
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados
        let dadosDiretor = await diretorDAO.selectByNomeDiretor(nomeDiretor)

        //verifica se o DAO retornou dados
        if (dadosDiretor) {

            //validação para ver a quantidade de itens retornados
            if (dadosDiretor.length > 0) {
                //criação do JSON para retorno dos dados
                diretorJSON.file = dadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            }
            else {
                return message.ERROR_NOT_FOUND //404
            }

        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }


    }


}

//Função para inserir um novo diretor, ao DB
const setInserirNovoDiretor = async function (id, dadosDiretor, contentType) {

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            //objeto JSON de Ator
            const diretorJSON = {}


            if (dadosDiretor.nome == ''            || dadosDiretor.nome == null            || dadosDiretor.nome == undefined            || dadosDiretor.length > 200 ||
                dadosDiretor.biografia == ''       || dadosDiretor.biografia == null       || dadosDiretor.biografia == undefined       || dadosDiretor.length > 500 ||
                dadosDiretor.foto == ''            || dadosDiretor.foto == null            || dadosDiretor.foto == undefined            || dadosDiretor.length > 30  ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento == undefined || dadosDiretor.length > 20

            ) {
                return message.ERROR_REQUIRED_FIELDS //400

            }
            else {
                let validadeStatus = true

                if (validadeStatus) {
                      //encaminha o ID ao DAO para fazer a pesquisa no banco de dados
                    let diretorNovo = await diretorDAO.insertDiretor(id, dadosDiretor)
                    //let diretorID = await diretorDAO.lastInsertId()


                     //validação para ver a quantidade de itens retornados
                    if (diretorNovo.length > 0) {
                        diretorJSON.file = dadosDiretor
                        diretorJSON.id = 'Id editado' + id
                        diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        diretorJSON.message = message.SUCCESS_CREATED_ITEM.message


                        return diretorJSON //201

                    }
                    else {
                       
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
           
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }

}


//Função para excluir um Diretor, presente no DB, filtrando pelo ID
const setExcluirDiretor = async function (id_classificacao) {

    try {

        idDiretor = id_classificacao

        if (idDiretor == null || isNaN(idDiretor) || idDiretor == undefined || idDiretor == '') {

            return message.ERROR_REQUIRED_FIELDS //404

        } else {
            let dadosDiretor = await diretorDAO.deleteAtor(idDiretor)

            if (dadosDiretor) {
                return message.SUCESS_DELETE_ITEM //201
            }
            else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

//Função para Atualizar um diretor, presente no DB, filtrando pelo ID
const setAtualizarDiretor = async function (id_diretor, dadosDiretor, contentType) {
    try {


        
        console.log('rrrrrrrrrrr');

        if (String(contentType).toLowerCase() == 'application/json') {

            let idLocal = id_diretor

            const diretorJSON = {}

            console.log('aaaaaaaaaaaa');

            if (dadosDiretor.id_sexoa == ''        || dadosDiretor.id_sexoa == null        || dadosDiretor.id_sexoa == undefined     || dadosAtor.length > 2   ||
                dadosDiretor.nome == ''            || dadosDiretor.nome == null            || dadosDiretor.nome == undefined         || dadosAtor.length > 200 ||
                dadosDiretor.biografia == ''       || dadosDiretor.biografia == null       || dadosDiretor.biografia == undefined    || dadosAtor.length > 500 ||
                dadosDiretor.foto == ''            || dadosDiretor.foto == null            || dadosDiretor.foto == undefined         || dadosAtor.length > 200 ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == null || dadosAtor.data_nascimento == undefined || dadosAtor.length > 20

            ) {
                return message.ERROR_REQUIRED_FIELDS
            }
            else {

                console.log('ttttttttt');
                let validadeStatus = true

                if (validadeStatus == true) {
                    console.log(dadosDiretor);
                    
                    console.log('ooooooooooo');
                    dadosAtor.id = idLocal
                    let diretorAtualizado = await diretorDAO.updateDiretor(dadosDiretor)
                  

                    console.log(diretorAtualizado)

                    console.log('pppppppppp');

                    if (diretorAtualizado) {
                        diretorJSON.file = dadosDiretor
                        diretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        diretorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        diretorJSON.message = message.SUCCESS_CREATED_ITEM.message

        
                        return diretorJSON
                    }
                    else {
                    console.log("tototo");
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }

            }
        } 
        
        else {
            console.log("gsdvdsgsdg");
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }

}

module.exports = {
    getListarDiretor,
    getBuscarIdDiretor,
    getBuscarNomeDiretor,
    setInserirNovoDiretor,
    setExcluirDiretor,
    setAtualizarDiretor
}