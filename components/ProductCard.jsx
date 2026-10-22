import React, { memo, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import {
  FALLBACK_PRODUCT_IMAGE,
  PLACEHOLDER_BLURHASH,
} from '../constants/Images';
import {
  formatINR,
  calculateDiscount,
  formatReviewCount,
} from '../utils/helper';
import { useCart } from '../hooks/useCart';

const ProductCard = memo(function ProductCard({
  product,
  style,
  horizontal = false,
}) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const wishlisted = isInWishlist(product?.id);
  const inCart = isInCart(product?.id);
  const discount = calculateDiscount(product?.originalPrice, product?.price);

  const handleOpenProduct = useCallback(() => {
    if (!product?.id) return;
    router.push({
      pathname: '/product/productDetails',
      params: { id: String(product.id) },
    });
  }, [product?.id]);

  const handleToggleWishlist = useCallback(() => {
    if (!product?.id) return;
    toggleWishlist(product.id);
  }, [product?.id, toggleWishlist]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, 1);
  }, [product, addToCart]);

  if (!product) return null;

  const imageUri =
    !imageError && product.image ? product.image : FALLBACK_PRODUCT_IMAGE;

  if (horizontal) {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={handleOpenProduct}
        style={[styles.horizontalCard, style]}
      >
        <View style={styles.horizontalImageWrapper}>
          <Image
            source={{ uri: imageUri }}
            placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
            contentFit="cover"
            transition={250}
            onError={() => setImageError(true)}
            style={styles.horizontalImage}
          />
          {discount > 0 ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.horizontalInfo}>
          <Text style={styles.categoryLabel}>{product.category}</Text>
          <Text style={styles.productTitle} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productDesc} numberOfLines={1}>
            {product.description}
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={Colors.star} />
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.reviewCount}>
              ({formatReviewCount(product.reviews)})
            </Text>
          </View>

          <View style={styles.priceBottomRow}>
            <View style={styles.priceGroup}>
              <Text style={styles.priceText}>{formatINR(product.price)}</Text>
              {product.originalPrice > product.price ? (
                <Text style={styles.originalPriceText}>
                  {formatINR(product.originalPrice)}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={handleAddToCart}
              style={[styles.miniCartBtn, inCart && styles.miniCartBtnActive]}
            >
              <Ionicons
                name={inCart ? 'checkmark' : 'add'}
                size={18}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handleOpenProduct}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
          contentFit="cover"
          transition={250}
          onError={() => setImageError(true)}
          style={styles.image}
        />

        {discount > 0 ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleToggleWishlist}
          style={styles.wishlistBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={wishlisted ? Colors.primary : Colors.dark}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.categoryLabel} numberOfLines={1}>
          {product.brand || product.category}
        </Text>
        <Text style={styles.productTitle} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.productDesc} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={Colors.star} />
          <Text style={styles.ratingValue}>{product.rating}</Text>
          <Text style={styles.reviewCount}>
            ({formatReviewCount(product.reviews)})
          </Text>
        </View>

        <View style={styles.priceBottomRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.priceText}>{formatINR(product.price)}</Text>
            {product.originalPrice > product.price ? (
              <Text style={styles.originalPriceText}>
                {formatINR(product.originalPrice)}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAddToCart}
            style={[styles.miniCartBtn, inCart && styles.miniCartBtnActive]}
          >
            <Ionicons
              name={inCart ? 'checkmark' : 'cart-outline'}
              size={15}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 155,
    backgroundColor: Colors.surfaceAlt,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  productDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  priceBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 6,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    marginRight: 5,
  },
  originalPriceText: {
    fontSize: 11,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  miniCartBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniCartBtnActive: {
    backgroundColor: Colors.success,
  },
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    elevation: 2,
  },
  horizontalImageWrapper: {
    width: 105,
    height: 105,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceAlt,
    marginRight: 12,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  horizontalInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ProductCard;
