import { useSQLiteContext} from 'expo-sqlite';

export type ClienteDataBase = {
    id: number
    nome: string
    telefone: string
    endereco: string
}//Criando o local de variaveis do banco

export function useClienteDataBase() {
    const dataBase = useSQLiteContext();//Acessar todos os métodos do BD

    async function create(data: Omit<ClienteDataBase, "id">) {
        const statement = await dataBase.prepareAsync(
            "INSERT INTO pessoa (nome, telefone, endereco) VALUES ($nome, $telefone, $endereco)"
        )

        try{
            const result = await statement.executeAsync({
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco
            })//executa o comando SQL

            const insertedRowId = result.lastInsertRowId.toLocaleString()//pega o id do último registro inserido
            return { insertedRowId } //retorna o id do último registro inserido

        }catch(error){
            throw error//throw é a mesma coisa que console.log
        }finally{
            await statement.finalizeAsync()
        }//finally é para encerrar o processo
    }//fim do create

    async function consultar(nome: string){
        try{
            const query = "select * from pessoa where nome like ?"//interrogação é usada para substituir por qualquer item de busca
            const reponse = await dataBase.getAllAsync<ClienteDataBase>(query, `%${nome}%`)//% é usado para buscar qualquer coisa antes ou depois do nome
            return reponse//retorna o resultado da consulta
        }catch(error){
            throw(error)
        }
    }//fim do consultar

    async function remove(id:number){
        try{
            await dataBase.execAsync("Delete from pessoa where id = " + id)//deleta o registro do banco
        }catch(error){
            throw(error)
        }
    }//fim do remover

    async function atualizar(data: ClienteDataBase){
        const statement = await dataBase.prepareAsync(
            "UPDATE pessoa SET nome = $nome, telefone = $telefone, endereco = $endereco WHERE id = $id"
        )
        try{
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco
            })//executa o comando SQL
        }catch(error){
            throw error
        }finally{
            await statement.finalizeAsync()
        }//finaliza o processo
        
    }//fim atualizar

    return { create, consultar, remove, atualizar}//retorna o create


}//fim da função