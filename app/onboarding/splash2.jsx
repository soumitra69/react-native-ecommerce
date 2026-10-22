import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Character from '../Image/freepik--Character--inject-4.svg';

export default function Splash2() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/splash3');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topContainer}>
        <Text style={styles.page}>
          <Text style={styles.active}>2</Text>
          <Text style={styles.inactive}>/3</Text>
        </Text>

        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Character width={280} height={280} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>Make Payment</Text>
          <Text style={styles.description}>
            Enjoy fast, seamless checkout with UPI, cards, net banking, or cash
            on delivery backed by 100% buyer protection.
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => router.replace('/onboarding/splash1')}
        >
          <Text style={styles.prev}>Prev</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.activeDot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          onPress={() => router.replace('/onboarding/splash3')}
        >
          <Text style={styles.next}>Next</Text>
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
  topContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  page: {
    fontSize: 18,
    fontWeight: '700',
  },
  active: {
    color: '#000000',
  },
  inactive: {
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
  bottom: {
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
  next: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F83758',
  },
  dots: {
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
});
