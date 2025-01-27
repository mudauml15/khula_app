import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { theme } from '../theme'

import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";

const screens = [
    {
        id: 1,
        title: "Welcome",
        content: "dummy text ",
    },
    {
        id: 2,
        title: "Welcome",
        content: "dummy text ",
    },
    {
        id: 3,
        title: "Welcome",
        content: "dummy text ",
    },


];


const LoginPage = () => {



    const navigation = useNavigation()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')

    const handleSaveUserDetails = async () => {
        try {
            await AsyncStorage.setItem('userDetails', JSON.stringify({ name, surname, password }))
            Alert.alert('Success', 'User details saved successfully!')
            navigation.navigate('profile')
        } catch (error) {
            Alert.alert('Error', 'Failed to save user details.')
        }
    }





    const { width } = useWindowDimensions();
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const progress = ((currentScreen + 2) / screens.length) * 100;

    const handleNext = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 2);
        } else {
            router.push("/upload");
        }
    };
    return (

        <>


            <View style={styles.container2}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Log in to your profile</Text>
                    <Text style={styles.subtitle}>
                        Almost there! Please add a few more details to complete your profile.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Name'
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder='Surname'
                        style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            style={styles.icon}
                        >
                            <Ionicons
                                name={passwordVisible ? 'eye' : 'eye-off'}
                                size={20}
                                color='gray'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigation.navigate('upload')}
                >
                    <Text style={styles.ButtonText}>Log in </Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({



    container2: {

        backgroundColor: "theme.colors.gray400"

    },
    progressContainer: {
        height: 4,
        backgroundColor: theme.colors.gray600,
        width: "100%",
        marginTop: 7,
    },
    progressBar: {
        height: "100%",
        backgroundColor: theme.colors.green100,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
    },



    container: {
        marginTop: 100,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 30,
        paddingBottom: 20,
        fontWeight: 'bold',
        color: '#002B4C',
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        color: 'green',
    },
    passwordContainer: {
        position: 'relative',
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    Button: {
        backgroundColor: '#013334',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    ButtonText: {
        color: theme.colors.green200,
        fontSize: 16,
        fontWeight: "bold"
    },

    app: {
        width: 1440,
        height: 100,
        "backgroundColor": theme.colors.gray300,
        display: "flex",
        flexDirection: "column"
    }
})

export default LoginPage
