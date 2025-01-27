import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { theme } from "../theme";
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

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        surname: '',
        password: '',
    });

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const storedUserDetails = await AsyncStorage.getItem('userDetails');
                if (storedUserDetails) {
                    setUserDetails(JSON.parse(storedUserDetails));
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch user details.');
            }
        };

        fetchUserDetails();
    }, []);




    const { width } = useWindowDimensions();
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const progress = ((currentScreen + 1) / screens.length) * 100;

    const handleNext = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
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
                <Text style={styles.header}>Profile Page</Text>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://plus.unsplash.com/premium_photo-1677094310956-7f88ae5f5c6b?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder for profile picture
                    />
                    <Text style={styles.name}>{`${userDetails.name} ${userDetails.surname}`}</Text>

                </View>

                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Name: {userDetails.name}</Text>
                    <Text style={styles.detailText}>Surname: {userDetails.surname}</Text>
                    <Text style={styles.detailText}>Password: {userDetails.password}</Text>
                </View>

                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.updateButtonText}>Log in </Text>
                </TouchableOpacity>
            </View>
        </>



    );
};

const styles = StyleSheet.create({


    container2: {

        backgroundColor: theme.colors.gray400

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
        marginTop: 60,
        flex: 1,
        backgroundColor: theme.colors.gray400,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.heading,
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: 'gray',
    },
    detailContainer: {
        marginVertical: 20,
    },
    detailText: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        color: theme.colors.green100,
    },
    updateButton: {
        backgroundColor: theme.colors.green300,
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 20,
    },
    updateButtonText: {
        color: theme.colors.green200,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Profile;
