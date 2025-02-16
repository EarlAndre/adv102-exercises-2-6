import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const handleLogin = () => {
        if (email && password) {
            console.log('Login Successful');
        } else {
            console.log('Please enter your email and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Button>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#438D80',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#262626',
    },
    input: {
        width: '70%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#262626',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '70%',
        padding: 10,
        backgroundColor: '#c93241',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
});