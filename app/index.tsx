import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Logo from './Image/Group 34010.svg';

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/splash1');
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.replace('/onboarding/splash1')}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Logo width={80} height={80} />
        <Text style={styles.logoText}>Stylish</Text>
      </View>
      <Text style={styles.tagline}>Fashion • Electronics • Lifestyle</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 12,
    fontSize: 46,
    fontWeight: '800',
    color: '#F83758',
  },
  tagline: {
    marginTop: 12,
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});
