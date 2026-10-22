import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !email.trim()) {
      setError('Please enter your registered email or username');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/auth/login');
          }
        }}
      >
        <Ionicons name="arrow-back" size={22} color={Colors.dark} />
      </TouchableOpacity>

      <Text style={styles.title}>{'Forgot\nPassword?'}</Text>

      <View
        style={[
          styles.inputContainer,
          error ? { borderColor: Colors.error } : null,
        ]}
      >
        <FontAwesome name="envelope-o" size={18} color="#777" />
        <TextInput
          placeholder="Enter your email address"
          placeholderTextColor="#777"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
            if (submitted) setSubmitted(false);
          }}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.infoText}>
        <Text style={{ color: Colors.primary }}>* </Text>
        We will send you a verification link to reset your password safely.
      </Text>

      {submitted ? (
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.successText}>
            Password reset instructions have been sent to {email}.
          </Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backToLogin}
        onPress={() => router.replace('/auth/login')}
      >
        <Text style={styles.backToLoginText}>Back to Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 30,
    lineHeight: 46,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  infoText: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 24,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  successText: {
    flex: 1,
    marginLeft: 8,
    color: '#065F46',
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    height: 55,
    backgroundColor: '#F83758',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
  },
  backToLogin: {
    marginTop: 20,
    alignItems: 'center',
  },
  backToLoginText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
