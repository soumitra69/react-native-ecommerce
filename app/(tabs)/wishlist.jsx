import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useCart } from '../../hooks/useCart';
import { filterAndSortProducts, CATEGORIES } from '../../services/api';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';

export default function WishlistScreen() {
  const { wishlistItems, products, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [activeTab, setActiveTab] = useState('wishlist'); // 'wishlist' | 'trending'

  const baseSource = useMemo(() => {
    if (activeTab === 'trending') {
      return products.filter((item) => item.trending || item.featured);
    }
    return wishlistItems;
  }, [activeTab, wishlistItems, products]);

  const displayedProducts = useMemo(
    () =>
      filterAndSortProducts(baseSource, {
        category: selectedCategory,
        searchQuery,
        sortBy,
      }),
    [baseSource, selectedCategory, searchQuery, sortBy]
  );

  const handleMoveAllToCart = useCallback(() => {
    wishlistItems.forEach((item) => addToCart(item, 1));
    router.push('/(tabs)/cart');
  }, [wishlistItems, addToCart]);

  const renderProduct = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Wishlist & Trending" showBrandLogo />

      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.searchWrap}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search any Product.."
              />
            </View>

            {/* Tab Switcher: Saved Wishlist vs Trending Products */}
            <View style={styles.tabSwitchRow}>
              <TouchableOpacity
                style={[
                  styles.switchTab,
                  activeTab === 'wishlist' && styles.switchTabActive,
                ]}
                onPress={() => setActiveTab('wishlist')}
              >
                <Ionicons
                  name="heart"
                  size={15}
                  color={
                    activeTab === 'wishlist'
                      ? Colors.white
                      : Colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.switchTabText,
                    activeTab === 'wishlist' && styles.switchTabTextActive,
                  ]}
                >
                  My Wishlist ({wishlistItems.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.switchTab,
                  activeTab === 'trending' && styles.switchTabActive,
                ]}
                onPress={() => setActiveTab('trending')}
              >
                <Ionicons
                  name="flame"
                  size={15}
                  color={
                    activeTab === 'trending'
                      ? Colors.white
                      : Colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.switchTabText,
                    activeTab === 'trending' && styles.switchTabTextActive,
                  ]}
                >
                  Trending Catalog
                </Text>
              </TouchableOpacity>
            </View>

            {/* Items Count + Sort & Filter Row */}
            <View style={styles.itemsToolbar}>
              <Text style={styles.itemsCount}>
                {displayedProducts.length}{' '}
                {displayedProducts.length === 1 ? 'Item' : 'Items'}
              </Text>

              <View style={styles.toolbarRight}>
                <TouchableOpacity
                  style={styles.toolButton}
                  onPress={() =>
                    setSortBy((prev) =>
                      prev === 'popular'
                        ? 'price_asc'
                        : prev === 'price_asc'
                        ? 'price_desc'
                        : prev === 'price_desc'
                        ? 'rating'
                        : 'popular'
                    )
                  }
                >
                  <Text style={styles.toolButtonText}>
                    {sortBy === 'price_asc'
                      ? 'Low → High'
                      : sortBy === 'price_desc'
                      ? 'High → Low'
                      : sortBy === 'rating'
                      ? 'Top Rated'
                      : 'Sort'}
                  </Text>
                  <Ionicons
                    name="swap-vertical"
                    size={14}
                    color={Colors.dark}
                  />
                </TouchableOpacity>

                {activeTab === 'wishlist' && wishlistItems.length > 0 ? (
                  <TouchableOpacity
                    style={[styles.toolButton, styles.addAllBtn]}
                    onPress={handleMoveAllToCart}
                  >
                    <Ionicons
                      name="cart-outline"
                      size={14}
                      color={Colors.white}
                    />
                    <Text style={styles.addAllBtnText}>Add All</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            {/* Category Filter Pills */}
            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  selected={selectedCategory === item}
                  onPress={setSelectedCategory}
                />
              )}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons
                name="heart-dislike-outline"
                size={42}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'wishlist'
                ? 'Your Wishlist is Empty'
                : 'No Matching Products'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'wishlist'
                ? 'Tap the heart icon on any product to save your favorites for later.'
                : 'Try adjusting your search or category filter.'}
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => {
                if (activeTab === 'wishlist') {
                  setActiveTab('trending');
                } else {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }
              }}
            >
              <Text style={styles.exploreBtnText}>
                {activeTab === 'wishlist'
                  ? 'Explore Trending Products'
                  : 'Reset Filters'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 28,
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  tabSwitchRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 12,
    padding: 4,
  },
  switchTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 9,
    gap: 6,
  },
  switchTabActive: {
    backgroundColor: Colors.primary,
  },
  switchTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  switchTabTextActive: {
    color: Colors.white,
  },
  itemsToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  itemsCount: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark,
  },
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 5,
  },
  toolButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark,
  },
  addAllBtn: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addAllBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 50,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
