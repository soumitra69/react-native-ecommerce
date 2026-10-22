import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FontAwesome,
  Feather,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { validateSignupForm } from '../../utils/validation';
import Colors from '../../constants/Colors';

export default function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = () => {
    const validation = validateSignupForm({ email, password, confirmPassword });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    signup(email, password);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>{'Create an\nAccount'}</Text>

          <View
            style={[
              styles.inputContainer,
              errors.email && styles.inputContainerError,
            ]}
          >
            <FontAwesome name="user" size={20} color="#777" />
            <TextInput
              placeholder="Username or Email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
              }}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <View
            style={[
              styles.inputContainer,
              errors.password && styles.inputContainerError,
            ]}
          >
            <Feather name="lock" size={20} color="#777" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: null }));
                }
              }}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <View
            style={[
              styles.inputContainer,
              errors.confirmPassword && styles.inputContainerError,
            ]}
          >
            <Feather name="lock" size={20} color="#777" />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#777"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: null }));
                }
              }}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Feather
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}

          <Text style={styles.terms}>
            By clicking the{' '}
            <Text style={styles.termsHighlight}>Create Account</Text> button, you
            agree to the public offer and privacy terms.
          </Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>- OR Continue with -</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <AntDesign name="google" size={26} color="#EA4335" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Ionicons name="logo-apple" size={28} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Ionicons name="logo-facebook" size={26} color="#1877F2" />
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.signup}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 28,
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
    marginBottom: 14,
    backgroundColor: '#F8F8F8',
  },
  inputContainerError: {
    borderColor: Colors.error,
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
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 4,
  },
  terms: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 22,
  },
  termsHighlight: {
    color: '#F83758',
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
  orText: {
    marginTop: 36,
    alignSelf: 'center',
    color: '#666666',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 18,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#F83758',
    backgroundColor: '#FFF5F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: '#666666',
    fontSize: 15,
  },
  signup: {
    marginLeft: 6,
    color: '#F83758',
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});
