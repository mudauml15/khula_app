import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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

    return (
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
                onPress={() => navigation.navigate('upload')}
            >
                <Text style={styles.updateButtonText}>Upload Documents</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
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
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    updateButton: {
        backgroundColor: '#013334',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    updateButtonText: {
        fontSize: 18,
        color: '#35c080',
        fontWeight: 'bold',
    },
});

export default Profile;
