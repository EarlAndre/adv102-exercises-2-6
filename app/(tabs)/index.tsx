import { View, Text, StyleSheet, Button, Pressable } from "react-native"
import { Link } from "expo-router"

export default function Home() {

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { marginTop: 30 }]}>Earl Andre J.</Text>
            <Text style={styles.text}>Ledesma</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 20,
        backgroundColor: '#16a085',
    },
    text: {
        marginLeft: 25,
        color: '#262626',
        fontSize: 50,
    }
})