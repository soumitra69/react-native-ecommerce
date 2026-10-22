import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Character from '../Image/freepik--Character--inject-4.svg';

export default function Splash3() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.page}>
          <Text style={styles.current}>3</Text>
          <Text style={styles.total}>/3</Text>
        </Text>

        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Character width={280} height={280} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>Get Your Order</Text>
          <Text style={styles.description}>
            Track your package in real time and get lightning-fast doorstep
            delivery with hassle-free 7-day returns.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => router.replace('/onboarding/splash2')}
        >
          <Text style={styles.prev}>Prev</Text>
        </TouchableOpacity>

        <View style={styles.indicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.activeDot} />
        </View>

        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={styles.next}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  page: {
    fontSize: 18,
    fontWeight: '700',
  },
  current: {
    color: '#000000',
  },
  total: {
    color: '#A0A0A1',
  },
  skip: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  content: {
    marginTop: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000000',
  },
  description: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 24,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  footer: {
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prev: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D7D7D7',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 40,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#17223B',
    marginHorizontal: 5,
  },
  next: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F83758',
  },
});
