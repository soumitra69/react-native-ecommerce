import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import Character from "../Image/freepik--Character--inject-4.svg";

export default function Splash1() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/onboarding/splash2");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* <Stack.Screen options={{ headerShown: false }} /> */}
            <StatusBar style="dark" />
            <SafeAreaView style={styles.container}>
                {/* Top */}
                <View style={styles.topContainer}>
                    <Text style={styles.pageNumber}>
                        <Text style={{ color: "#000" }}>1</Text>
                        <Text style={{ color: "#A0A0A1" }}>/3</Text>
                    </Text>

                    <TouchableOpacity onPress={() => router.replace("/onboarding/splash3")}>
                        <Text style={styles.skip}>Skip</Text>
                    </TouchableOpacity>
                </View>

                {/* Image */}
                <Character
                    width={300}
                    height={300}
                    style={styles.image}
                />

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>Choose Products</Text>

                    <Text style={styles.description}>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                        sint. Velit officia consequat duis enim velit mollit.
                    </Text>
                </View>

                {/* Bottom */}
                <View style={styles.bottomContainer}>
                    <View style={styles.indicator}>
                        <View style={styles.activeDot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push("/onboarding/splash2")}
                    >
                        <Text style={styles.next}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
    },

    pageNumber: {
        fontSize: 18,
        fontWeight: "700",
    },

    skip: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },

    image: {
        alignSelf: "center",
        marginTop: 70,
    },

    content: {
        marginTop: 30,
        alignItems: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#000",
    },

    description: {
        marginTop: 15,
        fontSize: 15,
        lineHeight: 24,
        color: "#9B9B9B",
        textAlign: "center",
        paddingHorizontal: 10,
    },

    bottomContainer: {
        marginTop: "auto",
        marginBottom: 35,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    indicator: {
        flexDirection: "row",
        alignItems: "center",
    },

    activeDot: {
        width: 40,
        height: 8,
        borderRadius: 10,
        backgroundColor: "#17223B",
        marginRight: 10,
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#D7D7D7",
        marginRight: 10,
    },

    next: {
        fontSize: 18,
        fontWeight: "700",
        color: "#F83758",
    },
});