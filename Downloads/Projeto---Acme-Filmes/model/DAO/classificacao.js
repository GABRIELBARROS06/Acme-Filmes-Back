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

const selectAllClass = async function () {
    let sql = `select * from tbl_classificacao`

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    //Executa o script SQL no banco de dados e recebe o retorno dos dados
    let rsClass = await prisma.$queryRawUnsafe(sql);

    //Validação para retornar os dados
    if (rsClass.length > 0) {
        return rsClass
    }
    else {
        return false
    }

}

//Função para buscar um filme no BD filtrando pelo id
const selectByIdClass = async function (idClass) {
    try {
        //Script Sql para filtrar pelo id
        let sql = `select * from tbl_classificacao where id_classificacao = ${idClass}`

        //Executa o Sql no banco de dados
        let rsClass = await prisma.$queryRawUnsafe(sql)

        return rsClass

    } catch (error) {
        return false
    }


}
//Função para buscar um filme no banco de dados, filtrando pelo nome
const selectByNomeClass = async function (faixaEtaria) {
    try {
        let sql = `select * from tbl_classificacao where tbl_classificacao.faixa_etaria LIKE "%${faixaEtaria}%"`

        let rsClass = await prisma.$queryRawUnsafe(sql)

        return rsClass

    } catch (error) {
        return false

    }
}

const insertClass = async function (dadosClass) {

    try {

        let sql;



        sql = `insert into tbl_classificacao(
            faixa_etaria, 
            classificacao,
            caracteristicas 
            ) values (
             
                '${dadosClass.faixa_etaria}',
                '${dadosClass.classificacao}',
                '${dadosClass.caracteristicas}'


            )`;
        console.log(sql);

        //$executeRawUnsafe() - serve para executar o scripts sem retorno de dados(insert, update e delete)
        //$queryRaw() - serve para executar scripts com retorno de dados(select)
        let result = await prisma.$executeRawUnsafe(sql);

        console.log(result)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}


const lastInsertId = async function () {

    //last_insert_id - RETORNA O ULTIMO ID INSERIODO N TABELA
    //CAST() - CONVERTE TIPOS DE DADOS NO REETORNO DO SELECT
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1'

        let rsId = await prisma.$queryRawUnsafe(sql)
        return rsId
    }
    catch (error) {
        return false
    }


}

const deleteClass = async function (id_classificacao) {

    try {

        let sql;

        sql = `delete from tbl_classificacao where id_classificacao = ${id_classificacao}`

        console.log(sql)

        let result = await prisma.$queryRawUnsafe(sql)

        return result

    } catch (error) {
        return false
    }

}

const updateClass = async function (dadosClass) {
    try {

        let sql;

        sql = `update tbl_classificacao
        set 
        faixa_etaria = '${dadosClass.faixa_etaria}', 
        classificacao = '${dadosClass.classificacao}', 
        caracteristicas = '${dadosClass.caracteristicas}'

        where id_classificacao = ${dadosClass.id_classificacao};`
       
        let result = await prisma.$executeRawUnsafe(sql)
       
        return result

    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClass,
    selectByIdClass,
    selectByNomeClass,
    insertClass,
    lastInsertId,
    deleteClass,
    updateClass

}

