import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import { useCart } from '../../hooks/useCart';
import Header from '../../components/Header';
import { validateShippingForm } from '../../utils/validation';

const ADDRESS_TYPES = ['Home', 'Work', 'Other'];

export default function ShippingScreen() {
  const { shippingAddress, updateShippingAddress } = useCart();

  const [form, setForm] = useState({
    fullName: shippingAddress?.fullName || 'Abhiraj Sisodiya',
    phone: shippingAddress?.phone || '9876543210',
    street: shippingAddress?.street || '216 St Pauls Rd, Ashok Nagar',
    city: shippingAddress?.city || 'Indore',
    state: shippingAddress?.state || 'Madhya Pradesh',
    pincode: shippingAddress?.pincode || '450116',
    landmark: shippingAddress?.landmark || 'Near City Center Mall',
    addressType: shippingAddress?.addressType || 'Home',
  });

  const [errors, setErrors] = useState({});

  const handleField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleContinue = () => {
    const check = validateShippingForm(form);
    if (!check.isValid) {
      setErrors(check.errors);
      return;
    }
    updateShippingAddress(form);
    router.push('/checkout/placeOrder');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Shipping Address" showBack showActions={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.formCard}>
            <Text style={styles.cardHeading}>Contact & Delivery Details</Text>

            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              value={form.fullName}
              onChangeText={(v) => handleField('fullName', v)}
              placeholder="Recipient Full Name"
              style={[styles.input, errors.fullName && styles.inputError]}
            />
            {errors.fullName ? (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            ) : null}

            <Text style={styles.label}>10-Digit Mobile Number *</Text>
            <TextInput
              value={form.phone}
              onChangeText={(v) => handleField('phone', v)}
              placeholder="9876543210"
              keyboardType="phone-pad"
              maxLength={10}
              style={[styles.input, errors.phone && styles.inputError]}
            />
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}

            <Text style={styles.label}>
              House No., Building, Street Address *
            </Text>
            <TextInput
              value={form.street}
              onChangeText={(v) => handleField('street', v)}
              placeholder="House/Flat No., Street, Area"
              style={[styles.input, errors.street && styles.inputError]}
            />
            {errors.street ? (
              <Text style={styles.errorText}>{errors.street}</Text>
            ) : null}

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City *</Text>
                <TextInput
                  value={form.city}
                  onChangeText={(v) => handleField('city', v)}
                  placeholder="City"
                  style={[styles.input, errors.city && styles.inputError]}
                />
                {errors.city ? (
                  <Text style={styles.errorText}>{errors.city}</Text>
                ) : null}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Pincode *</Text>
                <TextInput
                  value={form.pincode}
                  onChangeText={(v) => handleField('pincode', v)}
                  placeholder="450116"
                  keyboardType="number-pad"
                  maxLength={6}
                  style={[styles.input, errors.pincode && styles.inputError]}
                />
                {errors.pincode ? (
                  <Text style={styles.errorText}>{errors.pincode}</Text>
                ) : null}
              </View>
            </View>

            <Text style={styles.label}>State *</Text>
            <TextInput
              value={form.state}
              onChangeText={(v) => handleField('state', v)}
              placeholder="State"
              style={[styles.input, errors.state && styles.inputError]}
            />
            {errors.state ? (
              <Text style={styles.errorText}>{errors.state}</Text>
            ) : null}

            <Text style={styles.label}>Landmark (Optional)</Text>
            <TextInput
              value={form.landmark}
              onChangeText={(v) => handleField('landmark', v)}
              placeholder="Nearby landmark"
              style={styles.input}
            />

            <Text style={styles.label}>Address Type</Text>
            <View style={styles.typeRow}>
              {ADDRESS_TYPES.map((type) => {
                const selected = form.addressType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => handleField('addressType', type)}
                    style={[
                      styles.typePill,
                      selected && styles.typePillSelected,
                    ]}
                  >
                    <Ionicons
                      name={
                        type === 'Home'
                          ? 'home-outline'
                          : type === 'Work'
                          ? 'briefcase-outline'
                          : 'location-outline'
                      }
                      size={15}
                      color={selected ? Colors.white : Colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.typePillText,
                        selected && styles.typePillTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={handleContinue}
          >
            <Text style={styles.continueBtnText}>
              Save & Proceed to Payment
            </Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 32,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  cardHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Colors.dark,
    backgroundColor: Colors.surfaceAlt,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 11,
    marginTop: 4,
  },
  twoCol: {
    flexDirection: 'row',
    gap: 12,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  typePillSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typePillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  typePillTextSelected: {
    color: Colors.white,
  },
  bottomBar: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 12,
    gap: 8,
  },
  continueBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
