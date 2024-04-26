/***************************************************************************
 * Objetivo: Arquivo reponsavel pelo acesso ao Banco de Dados_mySQL,
 * aqui faremos o CRUD na tabel de filme
 * Data: 01/02/2024
 * Autor: Gabriel de Barros
 * Versão: 1.0
 **************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllAtor = async function () {


    let sql = `select * from tbl_ator;`

    let rsAtor = await prisma.$queryRawUnsafe(sql)

    if (rsAtor.length > 0) {

        return rsAtor
    } else {
        return false
    }


}

const selectByIdAtor = async function (id_ator) {
    try {

        let sql = `select * from tbl_ator where id_ator = ${id_ator}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor

    } catch (error) {

        return false

    }
}

const selectByNomeAtor = async function (nome) {

    try {
        let sql = `select * from tbl_ator where tbl_ator.nome LIKE "%${nome}%"`


        let rsAtor = await prisma.$queryRawUnsafe(sql)

        return rsAtor

    } catch (error) {

        return false

    }
}

const insertAtor = async function (dadosAtor) {

    try {

        let sql;

        sql = `insert into tbl_ator(
                                    id_sexoa, 
                                    nome, 
                                    biografia, 
                                    data_nascimento, 
                                    foto
) values (

'${dadosAtor.id_sexoa}',
'${dadosAtor.nome}',
'${dadosAtor.biografia}',
'${dadosAtor.data_nascimento}',
'${dadosAtor.foto}'

);`;

        console.log(sql)

        let rsAtor = await prisma.$executeRawUnsafe(sql)

        console.log(rsAtor)

        if (rsAtor) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}

const deleteAtor = async function (id_ator) {

    try {

        let sql;

        sql = `delete from tbl_ator where id_ator = ${id_ator};`

        console.log(sql);

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return true
        } else {
            return false
        }


    } catch (error) {

        return false

    }

}

const lastInsertId  = async function(id_ator) {

   try{
 
     let sql;

     sql = `select cast(last_insert_id() as decimal) as ${id_ator} from tbl_ator limit 1;`

     let rsAtor = await prisma.$queryRawUnsafe(sql)

     return rsAtor

   } catch(error) {

    return false
   }

}

const updateAtor = async function(dadosAtor) {

try{

let sql;

sql = `UPDATE tbl_ator 

SET id_sexoa = '${dadosAtor.id_sexoa}',
nome = '${dadosAtor.nome}', 
biografia = '${dadosAtor.biografia}',
data_nascimento = '${dadosAtor.data_nascimento}',
foto = '${dadosAtor.foto}'

where id_ator = ${dadosAtor.id};`

console.log(sql);

let rsAtor = await prisma.$executeRawUnsafe(sql)

return rsAtor

}catch(error) {
    return false
}


}

module.exports = {
    selectAllAtor,
    selectByIdAtor,
    selectByNomeAtor,
    insertAtor,
    deleteAtor,
    lastInsertId,
    updateAtor
}