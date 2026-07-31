import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Men', 'Women', 'Kids', 'Sale'];

  const featuredProducts = [
    { id: 1, title: 'Featured Product 1', image: '👕' },
    { id: 2, title: 'Featured Product 2', image: '👔' },
    { id: 3, title: 'Featured Product 3', image: '👗' },
    { id: 4, title: 'Featured Product 4', image: '👞' },
  ];

  const specialOffers = [
    {
      id: 1,
      title: '50-40% OFF',
      subtitle: 'Summer Collection',
      color: '#FF69B4',
      image: '🛍️',
    },
    {
      id: 2,
      title: 'Deal of the Day',
      subtitle: 'Limited Time',
      color: '#6C5CE7',
      image: '⏰',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Green Jacket',
      price: '$85.50',
      rating: 4.5,
      reviews: 120,
      image: '🧥',
    },
    {
      id: 2,
      name: 'Sports Shoes',
      price: '$125.00',
      rating: 4.8,
      reviews: 250,
      image: '👟',
    },
    {
      id: 3,
      name: 'Casual Wear',
      price: '$45.99',
      rating: 4.3,
      reviews: 89,
      image: '👕',
    },
    {
      id: 4,
      name: 'Formal Shoes',
      price: '$95.00',
      rating: 4.6,
      reviews: 156,
      image: '👞',
    },
  ];

  const newArrivals = [
    { id: 1, name: 'Summer Collection', price: '$99.99', image: '👗' },
    { id: 2, name: 'Beach Wear', price: '$49.99', image: '👒' },
    { id: 3, name: 'Casual Tees', price: '$29.99', image: '👕' },
  ];

  const trendingProducts = [
    { id: 1, name: 'Black Sneakers', price: '$89.99', image: '👟' },
    { id: 2, name: 'Leather Jacket', price: '$199.99', image: '🧥' },
    { id: 3, name: 'Summer Dress', price: '$79.99', image: '👗' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>Stylish</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <FontAwesome name="heart" size={24} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 15 }}>
                <FontAwesome name="shopping-bag" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={18} color="#999" />
            <TextInput
              placeholder="Search items"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.featuredCard}>
                <View style={styles.featuredImage}>
                  <Text style={styles.emoji}>{product.image}</Text>
                </View>
                <Text style={styles.featuredTitle}>{product.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Special Offer Banner */}
        <View style={styles.section}>
          {specialOffers.map((offer) => (
            <TouchableOpacity
              key={offer.id}
              style={[styles.offerBanner, { backgroundColor: offer.color }]}
            >
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                <TouchableOpacity style={styles.offerButton}>
                  <Text style={styles.offerButtonText}>Shop Now</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.offerEmoji}>{offer.image}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {products.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={12} color="#FFC107" />
                    <Text style={styles.rating}>{product.rating}</Text>
                    <Text style={styles.reviews}>({product.reviews})</Text>
                  </View>
                  <Text style={styles.productPrice}>{product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Arrivals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newArrivalsScroll}
          >
            {newArrivals.map((item) => (
              <TouchableOpacity key={item.id} style={styles.newArrivalCard}>
                <View style={styles.newArrivalImage}>
                  <Text style={styles.emoji}>{item.image}</Text>
                </View>
                <Text style={styles.newArrivalName}>{item.name}</Text>
                <Text style={styles.newArrivalPrice}>{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            scrollEnabled={false}
            data={trendingProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.trendingItem}>
                <View style={styles.trendingImage}>
                  <Text style={styles.emoji}>{item.image}</Text>
                </View>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingPrice}>{item.price}</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#CCC" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Summer Sale Banner */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.saleBanner}>
            <Text style={styles.saleBannerText}>Hot Summer Sale</Text>
            <Text style={styles.saleBannerDiscount}>UP TO 50% OFF</Text>
          </TouchableOpacity>
        </View>

        {/* Sponsored Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sponsored</Text>
          <TouchableOpacity style={styles.sponsoredCard}>
            <View style={styles.sponsoredImage}>
              <Text style={styles.emoji}>👟</Text>
            </View>
            <View style={styles.sponsoredInfo}>
              <Text style={styles.sponsoredTitle}>Premium Shoes</Text>
              <Text style={styles.sponsoredDiscount}>UP TO 50% OFF</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  categoryContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  categoryScroll: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#FF69B4',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF69B4',
    fontWeight: '600',
  },
  featuredScroll: {
    paddingRight: 16,
  },
  featuredCard: {
    marginRight: 12,
    alignItems: 'center',
  },
  featuredImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    width: 80,
  },
  offerBanner: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    opacity: 0.9,
  },
  offerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF69B4',
  },
  offerEmoji: {
    fontSize: 60,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 60,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  newArrivalsScroll: {
    paddingRight: 16,
  },
  newArrivalCard: {
    marginRight: 12,
    width: 120,
  },
  newArrivalImage: {
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  newArrivalName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  newArrivalPrice: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  trendingImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  trendingPrice: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  saleBanner: {
    backgroundColor: '#FF8A65',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  saleBannerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  saleBannerDiscount: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sponsoredCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  sponsoredImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sponsoredInfo: {
    flex: 1,
  },
  sponsoredTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sponsoredDiscount: {
    fontSize: 12,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontWeight: '500',
  },
  emoji: {
    fontSize: 40,
  },
});

export default App;