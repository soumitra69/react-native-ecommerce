import React, { useState, useMemo, useEffect } from 'react';
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

export default function CategoryScreen() {
  const params = useLocalSearchParams();
  const { products } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(
    typeof params.category === 'string' ? params.category : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (typeof params.category === 'string') {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  const categoryProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        category: selectedCategory,
        searchQuery,
        sortBy,
      }),
    [products, selectedCategory, searchQuery, sortBy]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title={
          selectedCategory === 'All'
            ? 'All Categories'
            : `${selectedCategory} Store`
        }
        showBack
      />

      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ProductCard product={item} />}
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
                placeholder={`Search in ${selectedCategory}...`}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat}
                  category={cat}
                  selected={selectedCategory === cat}
                  onPress={setSelectedCategory}
                />
              ))}
            </ScrollView>

            <View style={styles.toolbar}>
              <Text style={styles.countText}>
                {categoryProducts.length} Products
              </Text>
              <TouchableOpacity
                style={styles.sortBtn}
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
                <Text style={styles.sortBtnText}>
                  {sortBy === 'price_asc'
                    ? 'Price: Low to High'
                    : sortBy === 'price_desc'
                    ? 'Price: High to Low'
                    : sortBy === 'rating'
                    ? 'Customer Rating'
                    : 'Sort: Popular'}
                </Text>
                <Ionicons name="swap-vertical" size={14} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons
              name="cube-outline"
              size={44}
              color={Colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No products in this filter</Text>
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
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  countText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.dark,
  },
  sortBtn: {
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
  sortBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginTop: 10,
  },
});
