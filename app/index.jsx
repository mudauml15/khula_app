import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { theme } from "../theme";
import React from "react";

const Index = () => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.container2}>
                        <Image
                            style={styles.Logo}
                            source={require("../assets/images/Image2.png")}
                        />
                    </View>

                    <View>
                        <Text style={[styles.heading1]}>Khula Trader</Text>
                    </View>
                    <Text style={[styles.heading2]}>
                        Sell your products and chat with your buyers.
                    </Text>
                </View>
                <View style={[styles.buttonGroup]}>
                    <TouchableOpacity
                        style={[styles.button, styles.button1]}
                        onPress={() => navigation.navigate("SignupPage")}
                    >
                        <Text style={[styles.buttonText1]}>Sign up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.button2]}
                        onPress={() => navigation.navigate("LoginPage")}
                    >
                        <Text style={[styles.buttonText2]}>Log in</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.teamtext]}>Accept team invite code</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.green300,
    },

    container2: {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },

    Logo: {
        width: 600,
        height: 400,
    },

    heading1: {
        fontSize: 30,
        color: theme.colors.green200,
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 10,
    },
    heading2: {
        fontSize: 40,
        color: theme.colors.white,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        padding: 8,
        gap: 8,
    },
    button: {
        padding: 16,
        flex: 1,
        textAlign: "center",
        borderRadius: 30,
    },
    button1: {
        borderColor: theme.colors.green200,
        borderWidth: 2,
    },
    buttonText1: {
        color: theme.colors.green200,
        textAlign: "center",
        fontWeight: "bold",
    },
    buttonText2: {
        color: theme.colors.green300,
        textAlign: "center",
        fontWeight: "bold",
    },
    button1: {
        borderColor: theme.colors.green200,
        borderWidth: 2,
    },
    button2: {
        backgroundColor: theme.colors.green200,
    },
    teamtext: {
        textAlign: "center",
        color: theme.colors.green200,
        marginTop: 32,
        marginBottom: 32,
        fontSize: 19.2,
        opacity: 0.5,
    },
});

export default Index;
