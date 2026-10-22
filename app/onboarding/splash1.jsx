import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Character from '../Image/freepik--Character--inject-4.svg';

export default function Splash1() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/splash2');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topContainer}>
        <Text style={styles.pageNumber}>
          <Text style={styles.activePage}>1</Text>
          <Text style={styles.totalPage}>/3</Text>
        </Text>

        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerContent}>
        <Character width={280} height={280} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>Choose Products</Text>
          <Text style={styles.description}>
            Discover curated collections across fashion, electronics, footwear,
            beauty, and home essentials at unbeatable prices.
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ width: 50 }} />
        <View style={styles.indicator}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          onPress={() => router.replace('/onboarding/splash2')}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  activePage: {
    color: '#000000',
  },
  totalPage: {
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
  bottomContainer: {
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 40,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#17223B',
    marginHorizontal: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D7D7D7',
    marginHorizontal: 5,
  },
  next: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F83758',
  },
});
