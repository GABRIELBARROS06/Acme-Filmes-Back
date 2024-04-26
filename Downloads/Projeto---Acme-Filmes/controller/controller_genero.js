/********************************************
*
*
**********************************************/

const message = require('../module/config.js');

const generoDAO = require('../model/DAO/genero.js')

const setInserirFilme = async function (dadosGenero, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {


           let novoGeneroJSON = {}

            if (dadosGenero.nome == '' || dadosGenero.nome == null || dadosGenero.nome == undefined || dadosGenero.nome.length > 30) {


                return message.ERROR_REQUIRED_FIELDS; //400

            } else {
                let validadeStatus = true

                if (validadeStatus) {

                    let novoGenero = await generoDAO.insertGenero(dadosGenero)

                    if (novoGenero) {

                        novoGeneroJSON.genero = dadosGenero
                        novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status;
                        novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code;
                        novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message;

                        return novoGeneroJSON;

                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500

                    }
                }
            }
        }
        else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 ERRO NA CONTROLE
    }
}

module.exports = {
    setInserirFilme
}
