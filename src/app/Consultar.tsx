import { View, Button, StyleSheet, Alert,FlatList} from "react-native"
import {Campo} from "@/components/Campos"
import {useState,useEffect} from 'react'
import { ClienteDataBase, useClienteDataBase } from "@/database/useClienteDataBase"
import { useNavigation } from "expo-router"
import {Cliente} from '@/components/Cliente'
 
 
 
export default function Index(){
    const [id, setId] = useState("")
    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
    const ClienteDataBase = useClienteDataBase()
    const navigation = useNavigation()
    const [busca,setBusca] = useState("")
   
    async function list(){
        try {
            const response = await ClienteDataBase.consultar(busca)
            setCliente(response)
        } catch (error) {
            console.log(error)
        }
    }//fim do listar

    async function datails(item:ClienteDataBase){
        setId(String(item.id))
        setNome(item.nome)
        setTelefone(item.telefone)
        setEndereco(item.endereco)
    }
 
    //carregar a lista do banco
    useEffect(() => {list()},[busca])
    return (
        <View style={styles.container}>
            <Campo placeholder="Pesquisar" onChangeText={setBusca} />
            <FlatList
                data = {cliente}
                keyExtractor={(item)=>String(item.id)}
                renderItem ={({item}) => <Cliente data={item}/>}
                contentContainerStyle={{gap:16}}
            />
            <Button style={styles.botao} title="Voltar" onPress={() => navigation.navigate('Index')}/>
        </View>
    );
}  
 
const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#898989',
            alignItems: "center",
        },

    }
);