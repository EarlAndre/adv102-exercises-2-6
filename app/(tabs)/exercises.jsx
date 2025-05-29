import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import HTMLView from 'react-native-htmlview';

export default function Exercise() {
    const exercises = [
        { title: 'Exercises 3', description: '\nCreate log in screen\nLogin screen fields\n\n *Email\n *Password', href: 'exercise_main/exercise3' },
        { title: 'Exercises 4', description: '\nCreate register screen\nRegister screen fields\n\n *Image: Allows user to select image\n *Name\n *Email\n *Password', href: 'exercise_main/exercise4' },
        { title: 'Exercises 5', description: '\nCreate a register screen and add a title and description to the card in the exercise tab. \nWhen the card is clicked, it should redirect to the register screen.\n\n *Image (Image picker when image selected should display the image selected)\n *Name (Text Input)\n *Email (Text Input)\n *Password (Text Input)\n *Register (Button) ', href: 'exercise_main/exercise5' },
        { title: 'Exercises 6', description: '\nCreate a simple CRUD using useContext and useReducer', href: 'exercise_main/exercise6' },
        { title: 'Exercises 7', description: '\nCreate a simple quiz using the API from Open Trivia Database.', href: 'exercise_main/exercise7' },
        { title: 'Exercises 8', description: '\nUsing React Hook Form, add appropriate validations for the registration and login page', href: 'exercise_main/exercise8' },
        { title: 'Exercises 9', description: '\nConnect your React Native app to Firebase. On the registration and login pages, integrate Firebase Authentication. Additionally, use Firebase Storage to allow users to upload a profile image during registration. ', href: 'exercise_main/exercise9' },
    ];

    return (
        <ScrollView style={[styles.scrollView]}>
            <View style={{ width: '100%' }}>
                {exercises.map((exercise, index) => {
                    return (
                        <Link key={index} style={{ width: '100%' }} href={exercise.href}>
                            <View style={[styles.container, { marginBottom: 10 }]}>
                                <Text style={[styles.text1]}>{exercise.title}</Text>
                                <Text style={[styles.text]}>{exercise.description}</Text>
                            </View>
                        </Link>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#16a085',
    },
    container: {
        marginHorizontal: '2.5%',
        padding: 40,
        backgroundColor: '#d4efdf',
        borderRadius: 5,
        width: '95%',
        marginTop: 20,
    },
    text: {
        fontSize: 13,
        color: '#262626',
    },
    text1: {
        fontSize: 15,
        color: '#0b5345',
    }
});
