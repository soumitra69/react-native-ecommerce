import React from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

// Import SVG
import Character from "../Image/freepik--Character--inject-4.svg";

const Splash3 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.page}>
          <Text style={styles.current}>3</Text>
          <Text style={styles.total}>/3</Text>
        </Text>

        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
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
        <Text style={styles.title}>Get Your Order</Text>

        <Text style={styles.description}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.prev}>Prev</Text>
        </TouchableOpacity>

        <View style={styles.indicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.activeDot} />
        </View>

        <TouchableOpacity onPress={() => router.replace("/auth/login")}>
          <Text style={styles.next}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Splash3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  page: {
    fontSize: 18,
    fontWeight: "700",
  },

  current: {
    color: "#000",
  },

  total: {
    color: "#A0A0A1",
  },

  skip: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  image: {
    alignSelf: "center",
    marginTop: 50,
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

  footer: {
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

  indicator: {
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

  next: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F83758",
  },
});