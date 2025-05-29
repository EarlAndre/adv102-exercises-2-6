import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { auth, storage } from './firebase.js';

const RegisterScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async ({ email, password, name }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      let photoURL = '';

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(storage, `profiles/${userCredential.user.uid}`);
        await uploadBytes(imageRef, blob);
        photoURL = await getDownloadURL(imageRef);
      }

      await updateProfile(userCredential.user, { displayName: name, photoURL });
      alert('Registration Successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image || 'https://via.placeholder.com/100' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      </TouchableOpacity>

      <Controller
        control={control}
        rules={{ required: 'Name is required' }}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput 
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text style={styles.detailText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
        }}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            style={styles.input}
          />
        )}
      />
      {errors.email && <Text style={styles.detailText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } }}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
          />
        )}
      />
      {errors.password && <Text style={styles.detailText}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
    backgroundColor: '#c93241',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
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
    marginTop: 5,
    color: '#e6256f',
  },
});