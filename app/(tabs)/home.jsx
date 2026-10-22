import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { PLACEHOLDER_BLURHASH } from '../../constants/Images';
import { CATEGORIES, filterAndSortProducts } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import { formatINR } from '../../utils/helper';

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const { products, isLoadingProducts, productsError, loadProducts } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        category: selectedCategory,
        searchQuery,
        sortBy,
      }),
    [products, selectedCategory, searchQuery, sortBy]
  );

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const newArrivals = useMemo(
    () => products.filter((item) => item.newArrival).slice(0, 6),
    [products]
  );

  const dealOfDayProducts = useMemo(
    () => products.filter((item) => item.featured).slice(0, 5),
    [products]
  );

  const handleSelectCategory = useCallback((category) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (visibleCount < filteredProducts.length) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  }, [visibleCount, filteredProducts.length]);

  const renderProductItem = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const listHeader = useMemo(
    () => (
      <View>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search any Product.."
            onSubmit={() => {
              if (searchQuery.trim()) {
                router.push({
                  pathname: '/(tabs)/search',
                  params: { q: searchQuery.trim() },
                });
              }
            }}
            onFilterPress={() => router.push('/(tabs)/search')}
          />
        </View>

        {/* Offline / Fallback Notice */}
        {productsError ? (
          <View style={styles.offlineBanner}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={Colors.warning}
            />
            <Text style={styles.offlineText}>{productsError}</Text>
          </View>
        ) : null}

        {/* All Featured Categories */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>All Featured</Text>
          <View style={styles.QuickSortRow}>
            <TouchableOpacity
              style={styles.sortActionChip}
              onPress={() =>
                setSortBy((prev) =>
                  prev === 'popular'
                    ? 'price_asc'
                    : prev === 'price_asc'
                    ? 'price_desc'
                    : 'popular'
                )
              }
            >
              <Text style={styles.sortActionText}>
                {sortBy === 'price_asc'
                  ? 'Price: Low'
                  : sortBy === 'price_desc'
                  ? 'Price: High'
                  : 'Sort'}
              </Text>
              <Ionicons name="swap-vertical" size={14} color={Colors.dark} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortActionChip}
              onPress={() =>
                router.push({
                  pathname: '/product/category',
                  params: { category: selectedCategory },
                })
              }
            >
              <Text style={styles.sortActionText}>Categories</Text>
              <Ionicons name="grid-outline" size={14} color={Colors.dark} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.circleCategoryList}
        >
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              selected={selectedCategory === category}
              variant="circle"
              onPress={handleSelectCategory}
            />
          ))}
        </ScrollView>

        {/* Hero Promo Banner */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: '/product/category',
              params: { category: 'Fashion' },
            })
          }
          style={styles.heroBanner}
        >
          <View style={styles.heroBannerContent}>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>MEGA SEASON SALE</Text>
            </View>
            <Text style={styles.heroTitle}>50-40% OFF</Text>
            <Text style={styles.heroSubtitle}>
              Now in Fashion & Footwear • All Colours
            </Text>
            <View style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80',
            }}
            placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
            contentFit="cover"
            style={styles.heroBannerImage}
          />
        </TouchableOpacity>

        {/* Deal of the Day Card */}
        <View style={styles.dealBanner}>
          <View>
            <Text style={styles.dealTitle}>Deal of the Day</Text>
            <View style={styles.dealTimerRow}>
              <Ionicons name="time-outline" size={14} color={Colors.white} />
              <Text style={styles.dealTimerText}>
                22h 55m 20s remaining
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.dealViewAllBtn}
            onPress={() =>
              router.push({
                pathname: '/product/category',
                params: { category: 'All' },
              })
            }
          >
            <Text style={styles.dealViewAllText}>View all</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Horizontal Featured Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {dealOfDayProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() =>
                router.push({
                  pathname: '/product/productDetails',
                  params: { id: item.id },
                })
              }
              style={styles.dealMiniCard}
            >
              <Image
                source={{ uri: item.image }}
                placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
                contentFit="cover"
                style={styles.dealMiniImage}
              />
              <View style={styles.dealMiniBody}>
                <Text style={styles.dealMiniName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.dealMiniPrice}>{formatINR(item.price)}</Text>
                <View style={styles.dealMiniRating}>
                  <Ionicons name="star" size={11} color={Colors.star} />
                  <Text style={styles.dealMiniRatingText}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Special Offers Strip */}
        <View style={styles.specialOfferCard}>
          <View style={styles.specialOfferIconBox}>
            <Ionicons name="gift-outline" size={28} color={Colors.primary} />
          </View>
          <View style={styles.specialOfferTextWrap}>
            <Text style={styles.specialOfferTitle}>Special Offers 🎉</Text>
            <Text style={styles.specialOfferDesc}>
              Use code <Text style={styles.couponHighlight}>STYLISH10</Text> for
              extra 10% OFF or <Text style={styles.couponHighlight}>SAVE200</Text>{' '}
              at checkout!
            </Text>
          </View>
        </View>

        {/* Filter Pills for Catalog Grid */}
        <View style={styles.catalogHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All'
                ? 'Best Sellers & Catalog'
                : `${selectedCategory} Collection`}
            </Text>
            <Text style={styles.catalogCountText}>
              Showing {filteredProducts.length} products
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/product/category',
                params: { category: selectedCategory },
              })
            }
          >
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [
      searchQuery,
      productsError,
      sortBy,
      selectedCategory,
      handleSelectCategory,
      dealOfDayProducts,
      filteredProducts.length,
    ]
  );

  const listFooter = useMemo(
    () => (
      <View style={styles.footerContainer}>
        {visibleCount < filteredProducts.length ? (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
          >
            <Text style={styles.loadMoreText}>
              Load More Products ({filteredProducts.length - visibleCount} more)
            </Text>
            <Ionicons name="chevron-down" size={16} color={Colors.primary} />
          </TouchableOpacity>
        ) : null}

        {/* New Arrivals Banner & Horizontal List */}
        <View style={styles.summerBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.summerBannerTitle}>New Arrivals</Text>
            <Text style={styles.summerBannerSub}>
              Summer &apos;26 Curated Collection
            </Text>
          </View>
          <TouchableOpacity
            style={styles.summerBannerBtn}
            onPress={() =>
              router.push({
                pathname: '/product/category',
                params: { category: 'All' },
              })
            }
          >
            <Text style={styles.summerBannerBtnText}>Explore</Text>
            <Ionicons name="arrow-forward" size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {newArrivals.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.88}
              onPress={() =>
                router.push({
                  pathname: '/product/productDetails',
                  params: { id: item.id },
                })
              }
              style={styles.dealMiniCard}
            >
              <Image
                source={{ uri: item.image }}
                placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
                contentFit="cover"
                style={styles.dealMiniImage}
              />
              <View style={styles.dealMiniBody}>
                <Text style={styles.dealMiniName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.dealMiniPrice}>{formatINR(item.price)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sponsored Card */}
        <View style={styles.sponsoredSection}>
          <Text style={styles.sponsoredLabel}>Sponsored</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: '/product/category',
                params: { category: 'Shoes' },
              })
            }
            style={styles.sponsoredCard}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
              }}
              placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
              contentFit="cover"
              style={styles.sponsoredImage}
            />
            <View style={styles.sponsoredRow}>
              <View>
                <Text style={styles.sponsoredTitle}>
                  Premium Footwear Edition — Up to 50% Off
                </Text>
                <Text style={styles.sponsoredSub}>
                  Nike, Jordan, George Walker & More
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.dark}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [visibleCount, filteredProducts.length, handleLoadMore, newArrivals]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Stylish" showBrandLogo />

      {isLoadingProducts && products.length === 0 ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading catalog...</Text>
        </View>
      ) : (
        <FlatList
          data={visibleProducts}
          keyExtractor={keyExtractor}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons
                name="search-outline"
                size={46}
                color={Colors.textMuted}
              />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySubtitle}>
                Try clearing your search or switching categories.
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          }
          onRefresh={() => loadProducts(true)}
          refreshing={isLoadingProducts}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={7}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningLight,
    marginHorizontal: 16,
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
  },
  offlineText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#92400E',
    flex: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark,
  },
  QuickSortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 4,
  },
  sortActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark,
  },
  circleCategoryList: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: '#FF6B8B',
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 165,
  },
  heroBannerContent: {
    flex: 1.2,
    padding: 18,
    justifyContent: 'center',
  },
  heroTag: {
    backgroundColor: 'rgba(255,255,255,0.24)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  heroTagText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.95,
    marginBottom: 12,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  heroButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  heroBannerImage: {
    flex: 0.9,
    height: '100%',
  },
  dealBanner: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  dealTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dealTimerText: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.92,
  },
  dealViewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  dealViewAllText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  dealMiniCard: {
    width: 145,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dealMiniImage: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.surfaceAlt,
  },
  dealMiniBody: {
    padding: 10,
  },
  dealMiniName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  dealMiniPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 3,
  },
  dealMiniRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dealMiniRatingText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  specialOfferCard: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  specialOfferIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  specialOfferTextWrap: {
    flex: 1,
  },
  specialOfferTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 3,
  },
  specialOfferDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  couponHighlight: {
    fontWeight: '800',
    color: Colors.primary,
  },
  catalogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 12,
  },
  catalogCountText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  footerContainer: {
    paddingTop: 4,
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 14,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 6,
  },
  loadMoreText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  summerBanner: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#FF8A65',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summerBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  summerBannerSub: {
    fontSize: 13,
    color: Colors.white,
    opacity: 0.92,
    marginTop: 2,
  },
  summerBannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  summerBannerBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  sponsoredSection: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sponsoredLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 8,
  },
  sponsoredCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sponsoredImage: {
    width: '100%',
    height: 150,
  },
  sponsoredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  sponsoredTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
  },
  sponsoredSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
});
