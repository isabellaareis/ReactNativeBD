import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDataBase(dataBase: SQLiteDatabase){
    await dataBase.execAsync(`
        CREATE TABLE IF NOT EXISTS pessoa(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            endereco TEXT NOT NULL
        );
    `)
}