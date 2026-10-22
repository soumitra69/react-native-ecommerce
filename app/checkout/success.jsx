import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/helper';

export default function OrderSuccessScreen() {
  const { lastOrder } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.badgeCircle}>
          <Ionicons name="checkmark" size={50} color={Colors.white} />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Thank you for shopping with Stylish. Your order has been placed
          successfully.
        </Text>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>
              {lastOrder?.id || 'STY-904812'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Paid</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>
              {formatINR(lastOrder?.summary?.total || 0)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Mode</Text>
            <Text style={styles.detailValue}>
              {(lastOrder?.paymentMethod || 'UPI').toUpperCase()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={[styles.detailValue, { color: Colors.success }]}>
              {lastOrder?.estimatedDelivery || '3-5 Business Days'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.replace('/(tabs)/profile')}
        >
          <Text style={styles.secondaryBtnText}>View Order in Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 4,
  },
  badgeCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 22,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.dark,
  },
  primaryBtn: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: '700',
  },
});
