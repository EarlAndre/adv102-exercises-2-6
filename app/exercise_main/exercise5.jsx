import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function ExerciseHome() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleRegister = () => {
        if (name && email && password) {
            setSubmitted(true);
        }
    };

    return (
        <View style={styles.container}>
            {!submitted ? (
                <>
                    <Text style={styles.title}>Register</Text>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>User Details</Text>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <Text style={styles.detailText}>Name: {name}</Text>
                    <Text style={styles.detailText}>Email: {email}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#93E9BE',
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
        backgroundColor: 'n',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
    detailsContainer: {
        alignItems: 'center',
    },
    detailText: {
        fontSize: 18,
        marginTop: 10,
        color: '#e6256f',
    },
});