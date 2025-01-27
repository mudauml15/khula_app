import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { theme } from "../theme";



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

const SignupPage = () => {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveUserDetails = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }

        try {
            await AsyncStorage.setItem(
                "userDetails",
                JSON.stringify({ name, surname, password })
            );
            Alert.alert("Success", "User details saved successfully! you may log in ");
            navigation.navigate("profile");
        } catch (error) {
            Alert.alert("Error", "Failed to save user details.");
        }
    };

    const { width } = useWindowDimensions();
    const [currentScreen, setCurrentScreen] = useState(0);
    const router = useRouter();
    const progress = ((currentScreen + 1) / screens.length) * 100;

    const handleNext = () => {
        if (currentScreen < screens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            router.push("/home");
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
                    <Text style={styles.title}>Complete your profile</Text>
                    <Text style={styles.subtitle}>
                        Almost there! Please add a few more details to complete your
                        profile.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="Surname"
                        style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Password"
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
                                name={passwordVisible ? "eye" : "eye-off"}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Confirm password"
                            style={styles.input}
                            secureTextEntry={!confirmPasswordVisible}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            style={styles.icon}
                        >
                            <Ionicons
                                name={confirmPasswordVisible ? "eye" : "eye-off"}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSaveUserDetails}>
                    <Text style={styles.buttonText}> Continue </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container2: {
        flex: 1,
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
        flex: 1,
        backgroundColor: theme.colors.gray400,
        paddingHorizontal: 20,
        justifyContent: "center",
        marginBottom: 350
    },
    header: {
        marginBottom: 30,
    },

    inputContainer: {
        marginBottom: 20,
    },
    input: {
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

        // borderWidth: 1 / 6,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,

    },
    passwordContainer: {
        position: "relative",
    },
    icon: {
        position: "absolute",
        right: 15,
        top: 15,
    },
    button: {
        backgroundColor: theme.colors.green300,
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: theme.colors.green200,
        fontSize: 16,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 16,
        color: "gray",
        marginTop: 5,
    },
});

export default SignupPage;
