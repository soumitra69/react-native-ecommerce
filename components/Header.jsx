import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { useCart } from '../hooks/useCart';

const Header = memo(function Header({
  title = 'Stylish',
  showBack = false,
  showBrandLogo = false,
  showActions = true,
  rightElement = null,
}) {
  const { cartSummary, wishlistIds } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(tabs)/home');
              }
            }}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="arrow-back" size={22} color={Colors.dark} />
          </TouchableOpacity>
        ) : null}

        {showBrandLogo ? (
          <View style={styles.brandRow}>
            <View style={styles.brandBadge}>
              <Ionicons name="bag-handle" size={18} color={Colors.white} />
            </View>
            <Text style={styles.brandText}>{title}</Text>
          </View>
        ) : (
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {rightElement ? (
        rightElement
      ) : showActions ? (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/wishlist')}
          >
            <Ionicons name="heart-outline" size={22} color={Colors.dark} />
            {wishlistIds.length > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {wishlistIds.length > 9 ? '9+' : wishlistIds.length}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { marginLeft: 10 }]}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <Ionicons name="bag-handle-outline" size={22} color={Colors.dark} />
            {cartSummary.itemCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartSummary.itemCount > 9 ? '9+' : cartSummary.itemCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  titleText: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.dark,
    flexShrink: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});

export default Header;
