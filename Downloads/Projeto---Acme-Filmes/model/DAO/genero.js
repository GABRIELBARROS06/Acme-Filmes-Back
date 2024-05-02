/***************************************************************************
 * Objetivo: Arquivo reponsavel pelo acesso ao Banco de Dados_mySQL,
 * aqui faremos o CRUD na tabel de genêro
 * Data: 01/05/2024
 * Autor: Gabriel de Barros
 * Versão: 1.0
 **************************************************************************/

//Import da biblioteca do prima/client para manipular os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia da classe PrismaClient
const prisma = new PrismaClient();


const insertGenero = async function() {

    try{

     let sql;

     sql = `insert into (nome) values 
     
     '${dadosClass.nome}';`

     console.log(sql)

     let result = await prisma.$executeRawUnsafe(sql)

     if (result) {
        return true
    } else {
        return false
    }
    
    } catch(error) {
      return false
    }



}

module.exports = {
    insertGenero
}