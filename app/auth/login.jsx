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
import { validateLoginForm } from '../../utils/validation';
import Colors from '../../constants/Colors';

export default function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('aashifa@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const validation = validateLoginForm({ email, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    login(email, password);
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
          <Text style={styles.title}>{'Welcome\nBack!'}</Text>

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

          <TouchableOpacity onPress={() => router.push('/auth/forgotPassword')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
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
            <Text style={styles.bottomText}>Create An Account</Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text style={styles.signup}>SignUp</Text>
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
  forgot: {
    alignSelf: 'flex-end',
    color: '#F83758',
    fontWeight: '600',
    marginBottom: 28,
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
  guestButton: {
    height: 46,
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  guestButtonText: {
    color: '#475569',
    fontSize: 15,
    fontWeight: '600',
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
