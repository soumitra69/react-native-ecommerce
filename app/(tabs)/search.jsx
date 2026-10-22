import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import { CATEGORIES, filterAndSortProducts } from '../../services/api';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';

const POPULAR_SEARCHES = [
  'Jacket',
  'Sneakers',
  'Dress',
  'Sony',
  'Serum',
  'Smartwatch',
  'Lamp',
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under1k', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1kto3k', label: '₹1,000 - ₹3,000', min: 1000, max: 3000 },
  { id: 'above3k', label: 'Above ₹3,000', min: 3000, max: Infinity },
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'newest', label: 'New Arrivals' },
];

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const { products } = useCart();

  const [searchQuery, setSearchQuery] = useState(
    typeof params.q === 'string' ? params.q : ''
  );
  const [selectedCategory, setSelectedCategory] = useState(
    typeof params.category === 'string' ? params.category : 'All'
  );
  const [selectedPriceId, setSelectedPriceId] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    if (typeof params.q === 'string') {
      setSearchQuery(params.q);
    }
    if (typeof params.category === 'string') {
      setSelectedCategory(params.category);
    }
  }, [params.q, params.category]);

  const activePriceRange = useMemo(
    () =>
      PRICE_RANGES.find((r) => r.id === selectedPriceId) || PRICE_RANGES[0],
    [selectedPriceId]
  );

  const results = useMemo(
    () =>
      filterAndSortProducts(products, {
        category: selectedCategory,
        searchQuery,
        sortBy,
        minPrice: activePriceRange.min,
        maxPrice: activePriceRange.max,
      }),
    [products, selectedCategory, searchQuery, sortBy, activePriceRange]
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceId('all');
    setSortBy('popular');
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard product={item} horizontal={viewMode === 'list'} />
    ),
    [viewMode]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Search & Filter" />

      <FlatList
        key={viewMode}
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={viewMode === 'grid' ? 2 : 1}
        columnWrapperStyle={
          viewMode === 'grid' ? styles.columnWrapper : undefined
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.searchBoxWrap}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search products, brands, categories..."
              />
            </View>

            {/* Quick Popular Tags */}
            <View style={styles.popularWrap}>
              <Text style={styles.filterSectionLabel}>Popular Searches</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsRow}
              >
                {POPULAR_SEARCHES.map((term) => (
                  <TouchableOpacity
                    key={term}
                    onPress={() => setSearchQuery(term)}
                    style={[
                      styles.searchTag,
                      searchQuery.toLowerCase() === term.toLowerCase() &&
                        styles.searchTagActive,
                    ]}
                  >
                    <Ionicons
                      name="trending-up-outline"
                      size={13}
                      color={
                        searchQuery.toLowerCase() === term.toLowerCase()
                          ? Colors.white
                          : Colors.primary
                      }
                    />
                    <Text
                      style={[
                        styles.searchTagText,
                        searchQuery.toLowerCase() === term.toLowerCase() &&
                          styles.searchTagTextActive,
                      ]}
                    >
                      {term}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Category Filter */}
            <Text style={styles.filterSectionLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsRow}
            >
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category}
                  category={category}
                  selected={selectedCategory === category}
                  onPress={setSelectedCategory}
                />
              ))}
            </ScrollView>

            {/* Price Filter */}
            <Text style={styles.filterSectionLabel}>Price Range</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsRow}
            >
              {PRICE_RANGES.map((range) => {
                const active = selectedPriceId === range.id;
                return (
                  <TouchableOpacity
                    key={range.id}
                    onPress={() => setSelectedPriceId(range.id)}
                    style={[styles.filterChip, active && styles.filterChipActive]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Sort Options */}
            <Text style={styles.filterSectionLabel}>Sort By</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagsRow}
            >
              {SORT_OPTIONS.map((option) => {
                const active = sortBy === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => setSortBy(option.id)}
                    style={[styles.filterChip, active && styles.sortChipActive]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Results Bar */}
            <View style={styles.resultsBar}>
              <Text style={styles.resultsCount}>
                {results.length} {results.length === 1 ? 'Result' : 'Results'}{' '}
                Found
              </Text>

              <View style={styles.resultsActions}>
                {(searchQuery ||
                  selectedCategory !== 'All' ||
                  selectedPriceId !== 'all') && (
                  <TouchableOpacity
                    onPress={handleResetFilters}
                    style={styles.clearAllBtn}
                  >
                    <Text style={styles.clearAllText}>Reset</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() =>
                    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
                  }
                  style={styles.viewToggleBtn}
                >
                  <Ionicons
                    name={viewMode === 'grid' ? 'list' : 'grid-outline'}
                    size={18}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons
              name="search-outline"
              size={48}
              color={Colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No matching products found</Text>
            <Text style={styles.emptySub}>
              We could not find any items matching your current filters.
            </Text>
            <TouchableOpacity
              onPress={handleResetFilters}
              style={styles.resetBtn}
            >
              <Text style={styles.resetBtnText}>Clear All Filters</Text>
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
  searchBoxWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  popularWrap: {
    marginTop: 4,
  },
  filterSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  tagsRow: {
    paddingHorizontal: 16,
  },
  searchTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    marginRight: 8,
    gap: 5,
  },
  searchTagActive: {
    backgroundColor: Colors.primary,
  },
  searchTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  searchTagTextActive: {
    color: Colors.white,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.dark,
    borderColor: Colors.dark,
  },
  sortChipActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  resultsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  clearAllBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.errorLight,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.error,
  },
  viewToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.dark,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },
  resetBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
  },
  resetBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});
