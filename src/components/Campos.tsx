import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';

export function Campo({...rest}:TextInputProps){
    return (
        <View>
            <TextInput style={Styles.cmp} {...rest}/>
        </View>
    );
}

const Styles = StyleSheet.create({
    cmp: {
        width: 300,
        fontSize: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
    },
});