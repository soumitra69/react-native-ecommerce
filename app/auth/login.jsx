import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { router } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (

    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        Welcome{"\n"}Back!
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

      {/* Password */}
      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#777" />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("./forgotPassword")}>
        <Text style={styles.forgot}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.loginText}>
          Login
        </Text>
      </TouchableOpacity>

      {/* OR */}
      <Text style={styles.orText}>
        - OR Continue with -
      </Text>

      {/* Social */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign
            name="google"
            size={28}
            color="#EA4335"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={30} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Ionicons
            name="logo-facebook"
            size={28}
            color="#1877F2"
          />
        </TouchableOpacity>
      </View>

      {/* Signup */}
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Create An Account
        </Text>

        <TouchableOpacity onPress={() => router.push("./signup")}>
          <Text style={styles.signup}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
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

  forgot: {
    alignSelf: "flex-end",
    color: "#FF4D6D",
    marginTop: -8,
    marginBottom: 35,
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

  orText: {
    marginTop: 60,
    alignSelf: "center",
    color: "#666",
    fontSize: 14,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    gap: 18,
  },

  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#FF3B5C",
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomText: {
    color: "#666",
    fontSize: 15,
  },

  signup: {
    marginLeft: 5,
    color: "#FF3B5C",
    fontWeight: "bold",
    textDecorationLine: "underline",
    fontSize: 15,
  },
});