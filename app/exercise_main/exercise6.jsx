import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, FlatList } from "react-native";

export default function Exercise6() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        if (name && phone && address) {
            setUsers([...users, { id: Date.now(), name, phone, address }]);
            setName("");
            setPhone("");
            setAddress("");
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setName(user.name);
        setPhone(user.phone);
        setAddress(user.address);
    };

    const handleUpdateUser = () => {
        setUsers(users.map(user => user.id === editingUser.id ? { ...editingUser, name, phone, address } : user));
        setEditingUser(null);
        setName("");
        setPhone("");
        setAddress("");
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Management</Text>
            <Text style={styles.text}>{editingUser ? "Edit User" : "Add User"}</Text>
            <Text style={styles.count}>Total Users: {users.length}</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />
            <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
            {editingUser ? (
                <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
                    <Text style={styles.buttonText}>Update User</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleAddUser}>
                    <Text style={styles.buttonText}>Add User</Text>
                </TouchableOpacity>
            )}

<FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.userItem}>
                        <Text>{index + 1}. {item.name} - {item.phone} - {item.address}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleEditUser(item)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteUser(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
    text: {
        fontSize: 18,
        marginBottom: 15,
        color: '#262626',
    },
    count: {
        fontSize: 15,
        marginBottom: 10,
        color: '#555',
    },
    input: {
        width: '70%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '70%',
        padding: 10,
        backgroundColor: '#3bd95a',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    userItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderColor: 'pink',
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#28a745',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 5,
        borderRadius: 5,
    },
});