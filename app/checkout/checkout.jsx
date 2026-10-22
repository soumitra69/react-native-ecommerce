import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import {
  FALLBACK_PRODUCT_IMAGE,
  PLACEHOLDER_BLURHASH,
} from '../../constants/Images';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import { formatINR } from '../../utils/helper';

export default function CheckoutScreen() {
  const { cartItems, cartSummary, shippingAddress } = useCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Checkout" showBack showActions={false} />
        <View style={styles.emptyWrap}>
          <Ionicons name="bag-outline" size={48} color={Colors.primary} />
          <Text style={styles.emptyTitle}>No Items to Checkout</Text>
          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => router.replace('/(tabs)/home')}
          >
            <Text style={styles.backHomeText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Checkout Summary" showBack showActions={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Delivery Address Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.titleInline}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.primary}
            />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/checkout/shipping')}
            style={styles.editAddressBtn}
          >
            <Ionicons name="create-outline" size={16} color={Colors.primary} />
            <Text style={styles.editAddressText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressTopRow}>
            <Text style={styles.recipientName}>{shippingAddress.fullName}</Text>
            <View style={styles.addressTag}>
              <Text style={styles.addressTagText}>
                {shippingAddress.addressType || 'Home'}
              </Text>
            </View>
          </View>
          <Text style={styles.addressLine}>{shippingAddress.street}</Text>
          <Text style={styles.addressLine}>
            {shippingAddress.city}, {shippingAddress.state} -{' '}
            {shippingAddress.pincode}
          </Text>
          <Text style={styles.phoneText}>
            Contact: +91 {shippingAddress.phone}
          </Text>
        </View>

        {/* Shopping List */}
        <Text style={[styles.sectionTitle, { marginTop: 18, marginBottom: 10 }]}>
          Shopping List ({cartSummary.itemCount} items)
        </Text>

        {cartItems.map((item) => {
          const product = item.product;
          return (
            <View
              key={`${product.id}-${item.selectedSize}`}
              style={styles.orderItemCard}
            >
              <Image
                source={{ uri: product.image || FALLBACK_PRODUCT_IMAGE }}
                placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
                contentFit="cover"
                style={styles.itemImage}
              />

              <View style={styles.itemBody}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.itemMeta}>
                  Size: {item.selectedSize} • Qty: {item.quantity}
                </Text>
                <View style={styles.ratingInline}>
                  <Ionicons name="star" size={12} color={Colors.star} />
                  <Text style={styles.ratingVal}>{product.rating}</Text>
                </View>
                <View style={styles.priceLine}>
                  <Text style={styles.itemPrice}>
                    {formatINR(product.price * item.quantity)}
                  </Text>
                  {product.originalPrice > product.price ? (
                    <Text style={styles.itemOriginal}>
                      {formatINR(product.originalPrice * item.quantity)}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}

        {/* Price Breakdown */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeading}>Price Breakdown</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Total MRP</Text>
            <Text style={styles.rowValue}>
              {formatINR(cartSummary.totalMRP)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Product Discount</Text>
            <Text style={[styles.rowValue, { color: Colors.success }]}>
              - {formatINR(cartSummary.productDiscount)}
            </Text>
          </View>

          {cartSummary.couponDiscount > 0 ? (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Coupon Discount</Text>
              <Text style={[styles.rowValue, { color: Colors.success }]}>
                - {formatINR(cartSummary.couponDiscount)}
              </Text>
            </View>
          ) : null}

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Charges</Text>
            <Text
              style={[
                styles.rowValue,
                cartSummary.shippingFee === 0 && { color: Colors.success },
              ]}
            >
              {cartSummary.shippingFee === 0
                ? 'FREE'
                : formatINR(cartSummary.shippingFee)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.grandTotalLabel}>Total Payable</Text>
            <Text style={styles.grandTotalValue}>
              {formatINR(cartSummary.total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotal}>{formatINR(cartSummary.total)}</Text>
          <Text style={styles.bottomNote}> Step 1 of 3</Text>
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push('/checkout/shipping')}
        >
          <Text style={styles.continueBtnText}>Confirm Shipping</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  editAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editAddressText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  addressCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  addressTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
  },
  addressTag: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  addressTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  addressLine: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  phoneText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 6,
  },
  orderItemCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  itemImage: {
    width: 82,
    height: 92,
    borderRadius: 10,
    backgroundColor: Colors.surfaceAlt,
  },
  itemBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark,
  },
  itemMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  ratingInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
  },
  itemOriginal: {
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.dark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  grandTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
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
    fontSize: 18,
    fontWeight: '900',
    color: Colors.dark,
  },
  bottomNote: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark,
    marginTop: 12,
    marginBottom: 18,
  },
  backHomeBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backHomeText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
