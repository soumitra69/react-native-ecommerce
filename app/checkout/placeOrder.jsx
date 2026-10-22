import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import { formatINR } from '../../utils/helper';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    title: 'UPI (GPay, PhonePe, Paytm)',
    subtitle: 'Instant zero-fee payment via UPI ID',
    icon: 'qr-code-outline',
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa •••• 4242 (Simulated Demo Card)',
    icon: 'card-outline',
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    subtitle: 'All major Indian banks supported',
    icon: 'business-outline',
  },
  {
    id: 'cod',
    title: 'Cash on Delivery (COD)',
    subtitle: 'Pay by cash or UPI at your doorstep',
    icon: 'cash-outline',
  },
];

export default function PlaceOrderScreen() {
  const {
    cartSummary,
    shippingAddress,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    placeOrder,
  } = useCart();

  const [processing, setProcessing] = useState(false);

  const handleConfirmOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      placeOrder({ paymentMethod: selectedPaymentMethod });
      setProcessing(false);
      router.replace('/checkout/success');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Payment & Place Order" showBack showActions={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Total Summary Card */}
        <View style={styles.card}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Order Subtotal</Text>
            <Text style={styles.summaryVal}>
              {formatINR(cartSummary.subtotal)}
            </Text>
          </View>
          {cartSummary.couponDiscount > 0 ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Coupon Savings</Text>
              <Text style={[styles.summaryVal, { color: Colors.success }]}>
                - {formatINR(cartSummary.couponDiscount)}
              </Text>
            </View>
          ) : null}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text
              style={[
                styles.summaryVal,
                cartSummary.shippingFee === 0 && { color: Colors.success },
              ]}
            >
              {cartSummary.shippingFee === 0
                ? 'FREE'
                : formatINR(cartSummary.shippingFee)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalVal}>{formatINR(cartSummary.total)}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionHeading}>Select Payment Method</Text>

        {PAYMENT_METHODS.map((method) => {
          const active = selectedPaymentMethod === method.id;
          return (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.85}
              onPress={() => setSelectedPaymentMethod(method.id)}
              style={[
                styles.paymentOption,
                active && styles.paymentOptionActive,
              ]}
            >
              <View
                style={[
                  styles.paymentIconWrap,
                  active && styles.paymentIconWrapActive,
                ]}
              >
                <Ionicons
                  name={method.icon}
                  size={22}
                  color={active ? Colors.primary : Colors.textSecondary}
                />
              </View>

              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>{method.title}</Text>
                <Text style={styles.paymentSub}>{method.subtitle}</Text>
              </View>

              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={22}
                color={active ? Colors.primary : Colors.textMuted}
              />
            </TouchableOpacity>
          );
        })}

        {/* Shipping Destination Recap */}
        <View style={[styles.card, { marginTop: 8 }]}>
          <Text style={styles.deliverToLabel}>Delivering To:</Text>
          <Text style={styles.deliverToName}>
            {shippingAddress.fullName} (+91 {shippingAddress.phone})
          </Text>
          <Text style={styles.deliverToAddr}>
            {shippingAddress.street}, {shippingAddress.city},{' '}
            {shippingAddress.state} - {shippingAddress.pincode}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotal}>{formatINR(cartSummary.total)}</Text>
          <Text style={styles.bottomSecure}>100% Safe Simulated Checkout</Text>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handleConfirmOrder}
          disabled={processing}
        >
          {processing ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <>
              <Text style={styles.payButtonText}>Place Order</Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color={Colors.white}
              />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  totalVal: {
    fontSize: 19,
    fontWeight: '900',
    color: Colors.primary,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF9FA',
  },
  paymentIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIconWrapActive: {
    backgroundColor: Colors.primaryLight,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
  },
  paymentSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  deliverToLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  deliverToName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.dark,
  },
  deliverToAddr: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bottomTotal: {
    fontSize: 19,
    fontWeight: '900',
    color: Colors.dark,
  },
  bottomSecure: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '600',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 26,
    height: 50,
    borderRadius: 12,
    gap: 8,
    minWidth: 160,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
