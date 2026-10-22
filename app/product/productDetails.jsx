import React, { useState, useMemo } from 'react';
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
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '../../constants/Colors';
import {
  FALLBACK_PRODUCT_IMAGE,
  PLACEHOLDER_BLURHASH,
} from '../../constants/Images';
import { getProductById } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import {
  formatINR,
  calculateDiscount,
  formatReviewCount,
} from '../../utils/helper';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    isInCart,
  } = useCart();

  const product = useMemo(() => {
    if (!id) return products[0] || getProductById('prod-1');
    return (
      products.find((item) => String(item.id) === String(id)) ||
      getProductById(id)
    );
  }, [id, products]);

  const sizes = useMemo(
    () =>
      Array.isArray(product?.sizes) && product.sizes.length > 0
        ? product.sizes
        : ['Standard'],
    [product]
  );

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [addedBanner, setAddedBanner] = useState(false);

  const similarProducts = useMemo(
    () =>
      products
        .filter(
          (item) =>
            item.category === product?.category &&
            String(item.id) !== String(product?.id)
        )
        .slice(0, 6),
    [products, product]
  );

  const wishlisted = isInWishlist(product?.id);
  const inCart = isInCart(product?.id);
  const discount = calculateDiscount(product?.originalPrice, product?.price);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize || sizes[0]);
    setAddedBanner(true);
    setTimeout(() => setAddedBanner(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize || sizes[0]);
    router.push('/checkout/checkout');
  };

  const imageUri =
    !imageError && product?.image ? product.image : FALLBACK_PRODUCT_IMAGE;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={product?.category || 'Product Details'} showBack />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Hero Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUri }}
            placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
            contentFit="cover"
            transition={250}
            onError={() => setImageError(true)}
            style={styles.heroImage}
          />

          {discount > 0 ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{discount}% OFF</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.wishlistFloating}
            onPress={() => toggleWishlist(product.id)}
          >
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? Colors.primary : Colors.dark}
            />
          </TouchableOpacity>
        </View>

        {/* Product Info Card */}
        <View style={styles.detailsBody}>
          <View style={styles.brandRow}>
            <Text style={styles.brandBadge}>
              {product.brand || product.category}
            </Text>
            <View style={styles.stockBadge}>
              <View style={styles.stockDot} />
              <Text style={styles.stockText}>In Stock</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.starsInline}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={
                    star <= Math.round(product.rating) ? 'star' : 'star-outline'
                  }
                  size={15}
                  color={Colors.star}
                />
              ))}
            </View>
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.reviewsText}>
              ({formatReviewCount(product.reviews)} verified ratings)
            </Text>
          </View>

          {/* Price Block */}
          <View style={styles.priceBox}>
            <Text style={styles.currentPrice}>{formatINR(product.price)}</Text>
            {product.originalPrice > product.price ? (
              <Text style={styles.originalPrice}>
                {formatINR(product.originalPrice)}
              </Text>
            ) : null}
            {discount > 0 ? (
              <View style={styles.savePill}>
                <Text style={styles.savePillText}>{discount}% Off</Text>
              </View>
            ) : null}
          </View>

          {/* Size Selection */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>
              Select Size:{' '}
              <Text style={styles.selectedSizeValue}>
                {selectedSize || sizes[0]}
              </Text>
            </Text>
            <View style={styles.sizeRow}>
              {sizes.map((sz) => {
                const isSelected = (selectedSize || sizes[0]) === sz;
                return (
                  <TouchableOpacity
                    key={sz}
                    onPress={() => setSelectedSize(sz)}
                    style={[
                      styles.sizeChip,
                      isSelected && styles.sizeChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeChipText,
                        isSelected && styles.sizeChipTextActive,
                      ]}
                    >
                      {sz}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.qtySection}>
            <Text style={styles.sectionHeading}>Quantity</Text>
            <View style={styles.qtyStepper}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color={Colors.dark} />
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.min(10, q + 1))}
              >
                <Ionicons name="add" size={18} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Details / Description */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Product Details</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Trust Badges */}
          <View style={styles.trustGrid}>
            <View style={styles.trustItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.trustText}>100% Authentic</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons
                name="refresh-outline"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.trustText}>7-Day Return</Text>
            </View>
            <View style={styles.trustItem}>
              <Ionicons
                name="rocket-outline"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.trustText}>Express Delivery</Text>
            </View>
          </View>

          {addedBanner ? (
            <View style={styles.addedToast}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={Colors.success}
              />
              <Text style={styles.addedToastText}>
                Added {quantity} × {product.name} to your cart!
              </Text>
            </View>
          ) : null}

          {/* Similar Products */}
          {similarProducts.length > 0 ? (
            <View style={styles.similarSection}>
              <Text style={styles.sectionHeading}>Similar Products</Text>
              <View style={styles.similarGrid}>
                {similarProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomActionBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color={Colors.white} />
          <Text style={styles.addToCartText}>
            {inCart ? 'Add More to Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Ionicons name="flash-outline" size={20} color={Colors.white} />
          <Text style={styles.buyNowText}>Buy Now</Text>
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
    paddingBottom: 28,
  },
  imageWrapper: {
    width: '100%',
    height: 330,
    backgroundColor: Colors.surfaceAlt,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 12,
  },
  wishlistFloating: {
    position: 'absolute',
    top: 14,
    right: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  detailsBody: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  stockText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },
  productName: {
    fontSize: 21,
    fontWeight: '800',
    color: Colors.dark,
    lineHeight: 28,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  starsInline: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.dark,
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    gap: 10,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark,
  },
  originalPrice: {
    fontSize: 15,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  savePill: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  savePillText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  sectionBlock: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 10,
  },
  selectedSizeValue: {
    color: Colors.primary,
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  sizeChipActive: {
    backgroundColor: Colors.primary,
  },
  sizeChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  sizeChipTextActive: {
    color: Colors.white,
  },
  qtySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  qtyStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 10,
    padding: 4,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    paddingHorizontal: 14,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  trustGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.dark,
  },
  addedToast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
    gap: 8,
  },
  addedToastText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
    flex: 1,
  },
  similarSection: {
    marginTop: 8,
  },
  similarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomActionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    height: 50,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 15,
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    height: 50,
    borderRadius: 12,
    gap: 8,
  },
  buyNowText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 15,
  },
});
