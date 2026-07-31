import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SignIn = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        Forget{"\n"}Password!
      </Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#777" />

        <TextInput
          placeholder="Username or Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.infoText}>
        * We will send you a message to set or reset your new password.
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => console.log(email)}
      >
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 35,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#F8F8F8",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#000",
  },

  infoText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 20,
  },

  loginButton: {
    height: 55,
    backgroundColor: "#FF3B5C",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
});