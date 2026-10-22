import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
import { formatINR, calculateDiscount } from '../../utils/helper';

export default function CartScreen() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSummary,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  const handleApplyPromo = (codeToUse) => {
    const res = applyCoupon(codeToUse ?? promoInput);
    setPromoFeedback(res);
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Shopping Bag" showActions={false} />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Your Shopping Bag is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you have not added anything to your cart yet. Explore
            top deals and add your favorite items!
          </Text>
          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.shopNowText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={`Shopping Bag (${cartSummary.itemCount})`}
        rightElement={
          <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Free Shipping Banner */}
        <View style={styles.shippingNotice}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={
              cartSummary.shippingFee === 0 ? Colors.success : Colors.secondary
            }
          />
          <Text style={styles.shippingNoticeText}>
            {cartSummary.shippingFee === 0
              ? 'Yay! You get FREE Express Delivery on this order.'
              : `Add ${formatINR(
                  999 - cartSummary.subtotal
                )} more for FREE delivery!`}
          </Text>
        </View>

        {/* Cart Items */}
        {cartItems.map((item) => {
          const product = item.product;
          const discount = calculateDiscount(
            product.originalPrice,
            product.price
          );
          return (
            <View
              key={`${product.id}-${item.selectedSize}`}
              style={styles.cartCard}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: '/product/productDetails',
                    params: { id: product.id },
                  })
                }
              >
                <Image
                  source={{ uri: product.image || FALLBACK_PRODUCT_IMAGE }}
                  placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
                  contentFit="cover"
                  style={styles.itemImage}
                />
              </TouchableOpacity>

              <View style={styles.itemDetails}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemBrand}>
                    {product.brand || product.category}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      removeFromCart(product.id, item.selectedSize)
                    }
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={Colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemName} numberOfLines={1}>
                  {product.name}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.sizePill}>
                    <Text style={styles.sizePillText}>
                      Size: {item.selectedSize}
                    </Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={11} color={Colors.star} />
                    <Text style={styles.ratingBadgeText}>{product.rating}</Text>
                  </View>
                </View>

                <View style={styles.priceQtyRow}>
                  <View>
                    <View style={styles.priceInline}>
                      <Text style={styles.itemPrice}>
                        {formatINR(product.price * item.quantity)}
                      </Text>
                      {product.originalPrice > product.price ? (
                        <Text style={styles.itemOriginalPrice}>
                          {formatINR(product.originalPrice * item.quantity)}
                        </Text>
                      ) : null}
                    </View>
                    {discount > 0 ? (
                      <Text style={styles.discountLabel}>
                        You save {discount}%
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantity(
                          product.id,
                          item.quantity - 1,
                          item.selectedSize
                        )
                      }
                    >
                      <Ionicons name="remove" size={16} color={Colors.dark} />
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantity(
                          product.id,
                          item.quantity + 1,
                          item.selectedSize
                        )
                      }
                    >
                      <Ionicons name="add" size={16} color={Colors.dark} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        {/* Coupon Section */}
        <View style={styles.couponCard}>
          <View style={styles.couponHeader}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={Colors.primary}
            />
            <Text style={styles.couponTitle}>Apply Coupons</Text>
          </View>

          {appliedCoupon ? (
            <View style={styles.appliedCouponRow}>
              <View style={styles.appliedLeft}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.appliedCodeText}>
                    {appliedCoupon.code} Applied
                  </Text>
                  <Text style={styles.appliedSavingsText}>
                    You saved {formatINR(cartSummary.couponDiscount)}!
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={removeCoupon}>
                <Text style={styles.removeCouponText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.promoInputRow}>
                <TextInput
                  value={promoInput}
                  onChangeText={setPromoInput}
                  placeholder="Enter coupon code (e.g. STYLISH10)"
                  placeholderTextColor={Colors.textMuted}
                  style={styles.promoInput}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => handleApplyPromo(promoInput)}
                >
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.quickCouponsRow}>
                <TouchableOpacity
                  style={styles.quickCouponChip}
                  onPress={() => {
                    setPromoInput('STYLISH10');
                    handleApplyPromo('STYLISH10');
                  }}
                >
                  <Text style={styles.quickCouponCode}>STYLISH10</Text>
                  <Text style={styles.quickCouponDesc}>10% OFF</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.quickCouponChip}
                  onPress={() => {
                    setPromoInput('SAVE200');
                    handleApplyPromo('SAVE200');
                  }}
                >
                  <Text style={styles.quickCouponCode}>SAVE200</Text>
                  <Text style={styles.quickCouponDesc}>Flat ₹200 OFF</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {promoFeedback && !appliedCoupon ? (
            <Text
              style={[
                styles.feedbackText,
                {
                  color: promoFeedback.success ? Colors.success : Colors.error,
                },
              ]}
            >
              {promoFeedback.message}
            </Text>
          ) : null}
        </View>

        {/* Order Payment Details */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Payment Details</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Order Amounts ({cartSummary.itemCount} items)
            </Text>
            <Text style={styles.summaryValue}>
              {formatINR(cartSummary.totalMRP)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount on MRP</Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              - {formatINR(cartSummary.productDiscount)}
            </Text>
          </View>

          {cartSummary.couponDiscount > 0 ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Coupon ({appliedCoupon?.code})
              </Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                - {formatINR(cartSummary.couponDiscount)}
              </Text>
            </View>
          ) : null}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text
              style={[
                styles.summaryValue,
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
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>
              {formatINR(cartSummary.total)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Checkout Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotalText}>
            {formatINR(cartSummary.total)}
          </Text>
          <Text style={styles.bottomSubText}>Inclusive of all taxes</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/checkout/checkout')}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Payment</Text>
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
  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.errorLight,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.error,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  shippingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  shippingNoticeText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  itemImage: {
    width: 96,
    height: 112,
    borderRadius: 10,
    backgroundColor: Colors.surfaceAlt,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBrand: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  sizePill: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sizePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  priceInline: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  itemOriginalPrice: {
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 2,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 8,
    padding: 3,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark,
    paddingHorizontal: 10,
  },
  couponCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  couponTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
  },
  promoInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  promoInput: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Colors.dark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  quickCouponsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  quickCouponChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    gap: 6,
  },
  quickCouponCode: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  quickCouponDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  appliedCouponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    padding: 12,
    borderRadius: 10,
  },
  appliedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appliedCodeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#065F46',
  },
  appliedSavingsText: {
    fontSize: 12,
    color: '#047857',
  },
  removeCouponText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.error,
  },
  feedbackText: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
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
  totalValue: {
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
  bottomTotalText: {
    fontSize: 19,
    fontWeight: '900',
    color: Colors.dark,
  },
  bottomSubText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  checkoutBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  shopNowText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
