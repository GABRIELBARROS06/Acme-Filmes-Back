/***************************************************************************
 * Objetivo: Arquivo reponsavel pelo acesso ao Banco de Dados_mySQL,
 * aqui faremos o CRUD na tabel de diretor
 * Data: 01/05/2024
 * Autor: Gabriel de Barros
 * Versão: 1.0
 **************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

const selectAllDiretor = async function () {


    let sql = `select * from tbl_diretor;`

    let rsDiretor = await prisma.$queryRawUnsafe(sql)

    if (rsDiretor.length > 0) {

        return rsDiretor
    } else {
        return false
    }


}

const selectByIdDiretor = async function (id_diretor) {
    try {

        let sql = `select * from tbl_diretor where id_diretor = ${id_diretor}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor

    } catch (error) {

        return false

    }
}

const selectByNomeDiretor = async function (nome) {

    try {
        let sql = `select * from tbl_diretor where tbl_diretor.nome LIKE "%${nome}%"`


        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        return rsDiretor

    } catch (error) {

        return false

    }
}

const insertDiretor = async function (dadosDiretor) {

    try {

        let sql;

        sql = `insert into tbl_diretor(
                                    id_sexoa, 
                                    nome, 
                                    biografia, 
                                    data_nascimento, 
                                    foto
) values (

'${dadosDiretor.id_sexoa}',
'${dadosDiretor.nome}',
'${dadosDiretor.biografia}',
'${dadosDiretor.data_nascimento}',
'${dadosDiretor.foto}'

);`;

        console.log(sql)

        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        console.log(rsDiretor)

        if (rsDiretor) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}

const deleteDiretor = async function (id_diretor) {

    try {

        let sql;

        sql = `delete from tbl_diretor where id_diretor = ${id_diretor};`

        console.log(sql);

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        if (rsDiretor) {
            return true
        } else {
            return false
        }


    } catch (error) {

        return false

    }

}

const lastInsertId  = async function(id_diretor) {

   try{
 
     let sql;

     sql = `select cast(last_insert_id() as decimal) as ${id_diretor} from tbl_diretor limit 1;`

     let rsDiretor = await prisma.$queryRawUnsafe(sql)

     return rsDiretor

   } catch(error) {

    return false
   }

}

const updateDiretor = async function(dadosDiretor) {

try{

let sql;

sql = `UPDATE tbl_diretor

SET id_sexoa = '${dadosDiretor.id_sexoa}',
nome = '${dadosDiretor.nome}', 
biografia = '${dadosDiretor.biografia}',
data_nascimento = '${dadosDiretor.data_nascimento}',
foto = '${dadosDiretor.foto}'

where id_diretor = ${dadosDiretor.id};`

console.log(sql);

let rsDiretor = await prisma.$executeRawUnsafe(sql)

return rsDiretor

}catch(error) {
    return false
}


}

module.exports = {
    selectAllDiretor,
    selectByIdDiretor,
    selectByNomeDiretor,
    insertDiretor,
    deleteDiretor,
    lastInsertId,
    updateDiretor
}