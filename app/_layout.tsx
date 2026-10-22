import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
