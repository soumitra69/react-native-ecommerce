import React, { memo } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const SearchBar = memo(function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search any Product..',
  onSubmit,
  onPress,
  editable = true,
  autoFocus = false,
  onFilterPress,
  style,
}) {
  if (!editable && onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.container, style]}
      >
        <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
        <View style={styles.rightIcon}>
          <Ionicons name="options-outline" size={18} color={Colors.primary} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        style={styles.input}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {value ? (
        <TouchableOpacity
          onPress={() => onChangeText?.('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.clearBtn}
        >
          <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      ) : null}
      {onFilterPress ? (
        <TouchableOpacity onPress={onFilterPress} style={styles.rightIcon}>
          <Ionicons name="options-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 0,
  },
  placeholderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.textMuted,
  },
  clearBtn: {
    padding: 4,
  },
  rightIcon: {
    marginLeft: 8,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
});

export default SearchBar;
