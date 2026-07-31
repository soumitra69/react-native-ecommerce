import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

// Import SVG as a component
import Character from "../Image/freepik--Character--inject-4.svg";

const Splash2 = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/onboarding/splash3");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="#fff"
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={styles.topContainer}>
                <Text style={styles.page}>
                    <Text style={styles.active}>2</Text>
                    <Text style={styles.inactive}>/3</Text>
                </Text>

                <TouchableOpacity onPress={() => router.replace("/onboarding/splash3")}>
                    <Text style={styles.skip}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* SVG Image */}
            <Character
                width={320}
                height={320}
                style={styles.image}
            />

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Make Payment</Text>

                <Text style={styles.description}>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                    sint. Velit officia consequat duis enim velit mollit.
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.prev}>Prev</Text>
                </TouchableOpacity>

                <View style={styles.dots}>
                    <View style={styles.dot} />
                    <View style={styles.activeDot} />
                    <View style={styles.dot} />
                </View>

                <TouchableOpacity
                    onPress={() => router.push("/onboarding/splash3")}
                >
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Splash2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    topContainer: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    page: {
        fontSize: 18,
        fontWeight: "700",
    },

    active: {
        color: "#000",
    },

    inactive: {
        color: "#A0A0A1",
    },

    skip: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },

    image: {
        alignSelf: "center",
        marginTop: 60,
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

    bottom: {
        marginTop: "auto",
        marginBottom: 35,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    prev: {
        fontSize: 18,
        fontWeight: "700",
        color: "#C4C4C4",
    },

    next: {
        fontSize: 18,
        fontWeight: "700",
        color: "#F83758",
    },

    dots: {
        flexDirection: "row",
        alignItems: "center",
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#D7D7D7",
        marginHorizontal: 5,
    },

    activeDot: {
        width: 40,
        height: 8,
        borderRadius: 10,
        backgroundColor: "#17223B",
        marginHorizontal: 5,
    },
});