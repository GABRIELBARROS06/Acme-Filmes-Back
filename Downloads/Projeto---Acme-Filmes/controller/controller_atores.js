/***********************************************************************************************************
 * Objetivo:Arquivo responsável  pela validação, consistencia de dados das requisições da API de Atores
 * Data:24/04/2024
 * Criador:Gabriel de Barros Gomes
 * Versão:1.0
 ***********************************************************************************************************/

const message = require('../module/config.js');

const atorDAO = require('../model/DAO/ator.js');

const getListarAtor = async function () {

    const atorJSON = {}

    let dadosAtor = await atorDAO.selectAllAtor()

    if (dadosAtor) {
        if (dadosAtor.length > 0) {
            atorJSON.file = dadosAtor
            atorJSON.quantidade = dadosAtor.length
            atorJSON.status_code = 200

            return atorJSON
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }

    else {
        return message.ERROR_INTERNAL_SERVER//500
    }


}

const getBuscarIdAtor = async function (id_ator) {

    let idAtor = id_ator

    const atorJSON = {}

    if (idAtor == '' || isNaN(idAtor) || idAtor == null) {
        return message.ERROR_NOT_FOUND //404
    }

    else {
        let dadosAtor = await atorDAO.selectByIdAtor(idAtor);


        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                atorJSON.file = dadosAtor
                atorJSON.status_code = 200

                return atorJSON
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
const getBuscarNomeAtor = async function (nome) {

    //Variável local para facilitar a validação
    const nomeAtor = nome

    //objeto JSON de Ator
    const atorJSON = {}

    //validação do conteúdo da variavel nome
    if (nomeAtor == '' || nomeAtor == undefined) {

        return message.ERROR_REQUIRED_FIELDS //400
    }
    else {
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados
        let dadosAtor = await atorDAO.selectByNomeAtor(nomeAtor)

        //verifica se o DAO retornou dados
        if (dadosAtor) {

            //validação para ver a quantidade de itens retornados
            if (dadosAtor.length > 0) {
                //criação do JSON para retorno dos dados
                atorJSON.file = dadosAtor
                atorJSON.status_code = 200

                return atorJSON
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

const setInserirNovoAtor = async function (id, dadosAtor, contentType) {

    try {



        if (String(contentType).toLowerCase() == 'application/json') {

            let atorJSON = {}


            if (dadosAtor.nome == '' || dadosAtor.nome == null || dadosAtor.nome == undefined || dadosAtor.length > 200 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == null || dadosAtor.biografia == undefined || dadosAtor.length > 500 ||
                dadosAtor.foto == '' || dadosAtor.foto == null || dadosAtor.foto == undefined || dadosAtor.length > 30 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento == undefined || dadosAtor.length > 20

            ) {
                return message.ERROR_REQUIRED_FIELDS //400

            }
            else {
                let validadeStatus = true

                if (validadeStatus) {
                    let atorNovo = await atorDAO.insertAtor(id, dadosAtor)
                    let atorID = await atorDAO.lastInsertId()



                    if (atorNovo) {
                        atorJSON.file = dadosAtor
                        atorJSON.id = 'Id editado' + id
                        atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        atorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        atorJSON.message = message.SUCCESS_CREATED_ITEM.message


                        return atorJSON //201

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

const setExcluirAtor = async function (id_classificacao) {

    try {

        idAtor = id_classificacao

        if (idAtor == null || isNaN(idAtor) || idAtor == undefined || idAtor == '') {

            return message.ERROR_REQUIRED_FIELDS //404

        } else {
            let dadosAtor = await atorDAO.deleteAtor(idAtor)

            if (dadosAtor) {
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

const setAtualizarAtor = async function (id_ator, dadosAtor, contentType) {
    try {


        
        console.log('rrrrrrrrrrr');

        if (String(contentType).toLowerCase() == 'application/json') {

            let idLocal = id_ator

            const atorJSON = {}

            console.log('aaaaaaaaaaaa');

            if (dadosAtor.id_sexoa == '' || dadosAtor.id_sexoa == null || dadosAtor.id_sexoa == undefined || dadosAtor.length > 2 ||
                dadosAtor.nome == '' || dadosAtor.nome == null || dadosAtor.nome == undefined || dadosAtor.length > 200 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == null || dadosAtor.biografia == undefined || dadosAtor.length > 500 ||
                dadosAtor.foto == '' || dadosAtor.foto == null || dadosAtor.foto == undefined || dadosAtor.length > 200 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento == undefined || dadosAtor.length > 20

            ) {
                return message.ERROR_REQUIRED_FIELDS
            }
            else {

                console.log('ttttttttt');
                let validadeStatus = true

                if (validadeStatus == true) {
                    console.log(dadosAtor);
                    
                    console.log('ooooooooooo');
                    dadosAtor.id = idLocal
                    let atorNovo = await atorDAO.updateAtor(dadosAtor)
                  

                    console.log(atorNovo)

                    console.log('pppppppppp');

                    if (atorNovo) {
                        atorJSON.file = dadosAtor
                        atorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        atorJSON.status = message.SUCCESS_CREATED_ITEM.status
                        atorJSON.message = message.SUCCESS_CREATED_ITEM.message

                        console.log('bbbbbbbbbbb');
                        console.log(atorJSON);

                        return atorJSON
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
    getListarAtor,
    getBuscarIdAtor,
    getBuscarNomeAtor,
    setInserirNovoAtor,
    setExcluirAtor,
    setAtualizarAtor
}