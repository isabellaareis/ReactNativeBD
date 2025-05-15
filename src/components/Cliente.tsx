import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';

type Props = PressableProps & {
    data:{
        id: string
        nome: string
        telefone: string
        endereco: string
    }
}//fim da instancia de variaveis

export function Cliente({ data, ...rest}:Props){
    return(
        <Pressable style={styles.fundo} {...rest}>
            <Text style={styles.texto}>
                {data.id} - {data.nome} - {data.telefone} - {data.endereco}
            </Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
   fundo:{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,

   },

   texto:{
        flex: 1,
   }
});