import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { theme } from '../theme'
import Tracker from '../components/Tracker'


import Profile from "./profile";

const LoginPage = () => {



    const [track, setTrack] = useState(1);

    const onNext = () => {
        if (track !== 3) setTrack(track => track + 1)
    }

    const onPrev = () => {
        if (track !== 1) setTrack(track => track - 1)
    }


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

    return (

        <>
            <View style={styles.app}>
                <Tracker track={track} />
                {track == 1 && <Tracker onNext={onNext} />}
                {track == 2 && <Profile onNext={onNext} onPrev={onPrev} />}
                {track == 3 && <Finish onPrev={onPrev} />}
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
                    style={styles.button}
                    onPress={handleSaveUserDetails}
                >
                    <Text style={styles.buttonText}> Continue </Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        backgroundColor: '#013334',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#35c080',
        fontSize: 16,
        fontWeight: 'bold',
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
