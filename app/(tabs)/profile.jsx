import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { AVATAR_PLACEHOLDER, PLACEHOLDER_BLURHASH } from '../../constants/Images';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import { formatINR } from '../../utils/helper';

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const { orders, wishlistIds, cartSummary, updateShippingAddress } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || 'Abhiraj Sisodiya',
    email: user?.email || 'aashifa@gmail.com',
    phone: user?.phone || '9876543210',
    password: '***********',
    pincode: user?.pincode || '450116',
    address: user?.address || '216 St Pauls Rd, Ashok Nagar',
    city: user?.city || 'Indore',
    state: user?.state || 'Madhya Pradesh',
    country: user?.country || 'India',
    bankAccount: user?.bankAccount || '204356XXXXXXX',
    accountHolder: user?.accountHolder || 'Abhiraj Sisodiya',
    ifscCode: user?.ifscCode || 'SBIN00428',
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (savedNotice) setSavedNotice(false);
  };

  const handleSave = () => {
    updateProfile(formData);
    updateShippingAddress({
      fullName: formData.name,
      phone: formData.phone,
      street: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    });
    setSavedNotice(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Profile & Checkout Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || AVATAR_PLACEHOLDER }}
              placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
              contentFit="cover"
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={14} color={Colors.white} />
            </View>
          </View>
          <Text style={styles.userName}>{formData.name}</Text>
          <Text style={styles.userEmail}>{formData.email}</Text>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statBox}
              onPress={() => router.push('/(tabs)/cart')}
            >
              <Text style={styles.statValue}>{cartSummary.itemCount}</Text>
              <Text style={styles.statLabel}>In Cart</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity
              style={styles.statBox}
              onPress={() => router.push('/(tabs)/wishlist')}
            >
              <Text style={styles.statValue}>{wishlistIds.length}</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{orders.length}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
          </View>
        </View>

        {/* Recent Orders Section if any */}
        {orders.length > 0 ? (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            {orders.slice(0, 2).map((order) => (
              <View key={order.id} style={styles.orderItem}>
                <View>
                  <Text style={styles.orderIdText}>Order #{order.id}</Text>
                  <Text style={styles.orderMetaText}>
                    {order.items?.length || 1} items • {order.estimatedDelivery}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.orderTotalText}>
                    {formatINR(order.summary?.total || 0)}
                  </Text>
                  <Text style={styles.orderStatusBadge}>{order.status}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Personal Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Details</Text>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={formData.email}
            onChangeText={(v) => handleFieldChange('email', v)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(v) => handleFieldChange('name', v)}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={formData.password}
            onChangeText={(v) => handleFieldChange('password', v)}
            style={styles.input}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={() => router.push('/auth/forgotPassword')}
            style={styles.changePasswordWrap}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* Business / Delivery Address Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Business Address Details</Text>

          <Text style={styles.label}>Pincode</Text>
          <TextInput
            value={formData.pincode}
            onChangeText={(v) => handleFieldChange('pincode', v)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            value={formData.address}
            onChangeText={(v) => handleFieldChange('address', v)}
            style={styles.input}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            value={formData.city}
            onChangeText={(v) => handleFieldChange('city', v)}
            style={styles.input}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            value={formData.state}
            onChangeText={(v) => handleFieldChange('state', v)}
            style={styles.input}
          />

          <Text style={styles.label}>Country</Text>
          <TextInput
            value={formData.country}
            onChangeText={(v) => handleFieldChange('country', v)}
            style={styles.input}
          />
        </View>

        {/* Bank Account Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Bank Account Details</Text>

          <Text style={styles.label}>Bank Account Number</Text>
          <TextInput
            value={formData.bankAccount}
            onChangeText={(v) => handleFieldChange('bankAccount', v)}
            style={styles.input}
          />

          <Text style={styles.label}>Account Holder&apos;s Name</Text>
          <TextInput
            value={formData.accountHolder}
            onChangeText={(v) => handleFieldChange('accountHolder', v)}
            style={styles.input}
          />

          <Text style={styles.label}>IFSC Code</Text>
          <TextInput
            value={formData.ifscCode}
            onChangeText={(v) => handleFieldChange('ifscCode', v)}
            style={styles.input}
            autoCapitalize="characters"
          />
        </View>

        {savedNotice ? (
          <View style={styles.savedBanner}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={Colors.success}
            />
            <Text style={styles.savedBannerText}>
              Profile and delivery details saved successfully!
            </Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            router.replace('/auth/login');
          }}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 36,
  },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.surfaceAlt,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.dark,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Colors.border,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  changePasswordWrap: {
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  changePasswordText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark,
  },
  orderMetaText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  orderTotalText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  orderStatusBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
    marginTop: 2,
  },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  savedBannerText: {
    marginLeft: 8,
    color: '#065F46',
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: Colors.errorLight,
    gap: 6,
  },
  logoutButtonText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '700',
  },
});
