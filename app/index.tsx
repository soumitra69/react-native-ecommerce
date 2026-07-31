import React, { useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { router } from "expo-router";
import Logo from "./Image/Group 34010.svg";

export default function index() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/onboarding/splash1");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo width={80} height={80} />
                <Text style={styles.logoText}>Stylish</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    logoContainer: {
        position: "absolute",
        top: 370,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center",
    },

    logoText: {
        marginLeft: 10,
        fontSize: 50,
        fontWeight: "700",
        color: "#F83758",
    },
});