import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarActiveTintColor: "#FF69B4",
                    tabBarInactiveTintColor: "#999999",
                    tabBarLabelStyle: styles.tabBarLabel,
                }}
            >
                {/* Home */}
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />

                {/* Wishlist */}
                <Tabs.Screen
                    name="wishlist"
                    options={{
                        title: "Wishlist",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                    }}
                />

                {/* Cart */}
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: "Cart",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cart" size={size} color={color} />
                        ),
                    }}
                />

                {/* Search */}
                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="search" size={size} color={color} />
                        ),
                    }}
                />

                {/* Profile */}
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
        elevation: 10,
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: "600",
    },
});