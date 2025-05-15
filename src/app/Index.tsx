import { View, Button, StyleSheet, Alert} from "react-native"
import {Campo} from "@/components/Campos";
import { useState } from "react";
import { ClienteDataBase, useClienteDataBase } from "@/database/useClienteDataBase";
import { useNavigation } from "expo-router";


export default function Index(){
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cliente, setCliente] = useState<ClienteDataBase[]>()
    const ClienteDataBase = useClienteDataBase();
    const navigation = useNavigation();

    async function create(){
        try{
            const response = await ClienteDataBase.create({
                nome,
                telefone,
                endereco
            })

            Alert.alert("Cliente cadastrado com sucesso! ID: " + response.insertedRowId)//Alerta de sucesso
        }catch(error){
            console.log(error)
        }//catch é para tratar o erro
    }//fim da create

    return (
        <View style={styles.container}>
            <Campo placeholder="Nome" onChangeText={setNome} value={nome}/>
            <Campo placeholder="Telefone" onChangeText={setTelefone} value={telefone}/>
            <Campo placeholder="Endereço" onChangeText={setEndereco} value={endereco}/>
            <Button  title="Cadastrar" onPress={create}/>
            <Button title="Consultar" onPress={() => navigation.navigate('Consultar')}/>
        </View>
    );
}  

const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#898989',
        },

    }
);