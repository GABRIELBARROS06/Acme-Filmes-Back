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

//Função para inserir um novo filme no BD
const insertFilme = async function (dadosFilme) {

    try {

        let sql;


        if (dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined) {
            sql = `insert into tbl_filme (
                                  nome,
                                  sinopse, 
                                  duracao,
                                  data_lancamento,
                                  data_relancamento,
                                  foto_capa,
                                  valor_unitario  
    
    ) values (

                                  '${dadosFilme.nome}',
                                 '${dadosFilme.sinopse}',
                                  '${dadosFilme.duracao}',
                                  '${dadosFilme.data_lancamento}',
                                  '${dadosFilme.data_relancamento}',
                                  '${dadosFilme.foto_capa}',
                                  '${dadosFilme.valor_unitario}'         

    )`;
            console.log(sql)
        } else {
            sql = `insert into tbl_filme (nome,
        sinopse, 
        duracao,
        data_lancamento,
        data_relancamento,
        foto_capa,
        valor_unitario  

) values (

        '${dadosFilme.nome}',
    '${dadosFilme.sinopse}',
        '${dadosFilme.duracao}',
        '${dadosFilme.data_lancamento}',
        null,
        '${dadosFilme.foto_capa}',
        '${dadosFilme.valor_unitario}'         

)`;
            console.log(sql)
        }

        //$executeRawUnsafe() - serve para executar o scripts sem retorno de dados(insert, updae e delete)
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

//Função para atualizar um filme no DB
const updateFilme = async function (dadosFilme) {

    try {
   
        let sql;

       if(dadosFilme.data_relancamento != '' &&
       dadosFilme.data_relancamento != null &&
       dadosFilme.data_relancamento != undefined){

        console.log(dadosFilme.nome)
        
        sql = `update tbl_filme
        set 
        nome = '${dadosFilme.nome}', 
        sinopse = '${dadosFilme.sinopse}', 
        duracao = '${dadosFilme.duracao}', 
        data_lancamento = '${dadosFilme.data_lancamento}', 
        data_relancamento = '${dadosFilme.data_relancamento}', 
        foto_capa = '${dadosFilme.foto_capa}', 
        valor_unitario = '${dadosFilme.valor_unitario}'

        where id = ${dadosFilme.id} 
        `

        console.log(sql)

       }

       else{

        sql = `update tbl_filme
        set 
        nome = '${dadosFilme.nome}', 
        sinopse = '${dadosFilme.sinopse}', 
        duracao = '${dadosFilme.duracao}', 
        data_lancamento = '${dadosFilme.data_lancamento}', 
        data_relancamento = null, 
        foto_capa = '${dadosFilme.foto_capa}',
        valor_unitario = '${dadosFilme.valor_unitario}'

        where id = ${dadosFilme.id} `

        console.log(sql);

       }

        //Script Sql para filtrar pelo id

        let result = await prisma.$executeRawUnsafe(sql);
        
        //Executa o Sql no banco de dados
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


//Função para deletar um filme no BD
const deleteFilme = async function (id) {

try{
    let sql;
   

        sql = `delete from tbl_filme where id = ${id}`
       
        console.log(sql)
  
    let result = await prisma.$executeRawUnsafe(sql);

   return result

}catch(error){
   return false;
}


}

//Função para inserir o ultimo id do ultimo filme colocado
const lastInsertId = async function () {

    //last_insert_id - RETORNA O ULTIMO ID INSERIODO N TABELA
    //CAST() - CONVERTE TIPOS DE DADOS NO REETORNO DO SELECT
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_filme limit 1'

        let rsId = await prisma.$queryRawUnsafe(sql)
        return rsId
    }
    catch (error) {
        return false
    }


}

//Função para listar todos os filmes do DB
const selectAllFilmes = async function () {

    //Script SQL para o Banco de Dados
    let sql = 'select * from tbl_filme';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    //Executa o script SQL no banco de dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //Validação para retornar os dados
    if (rsFilmes.length > 0) {
        return rsFilmes
    }
    else {
        return false
    }

}

//Função para buscar um filme no BD filtrando pelo id
const selectByIdFilme = async function (id) {
    try {
        //Script Sql para filtrar pelo id
        let sql = `select * from tbl_filme where id = ${id}`

        //Executa o Sql no banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    } catch (error) {
        return false
    }


}
//Função para buscar um filme no banco de dados, filtrando pelo nome
const selectByNomeFilme = async function (titulo) {
    try {
        let sql = `select * from tbl_filme where tbl_filme.titulo LIKE "%${titulo}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    } catch (error) {
        return false

    }
}


module.exports = {

    insertFilme,
    updateFilme,
    deleteFilme,
    lastInsertId,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme
}