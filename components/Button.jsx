import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Button = memo(function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const isOutline = variant === 'outline';
  const isSecondary = variant === 'secondary';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        size === 'sm' && styles.sizeSm,
        size === 'lg' && styles.sizeLg,
        isOutline && styles.outline,
        isSecondary && styles.secondary,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? Colors.primary : Colors.white}
        />
      ) : (
        <View style={styles.content}>
          {icon ? (
            <Ionicons
              name={icon}
              size={size === 'sm' ? 16 : 20}
              color={isOutline ? Colors.primary : Colors.white}
              style={styles.icon}
            />
          ) : null}
          <Text
            style={[
              styles.text,
              size === 'sm' && styles.textSm,
              size === 'lg' && styles.textLg,
              isOutline && styles.textOutline,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeSm: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  sizeLg: {
    height: 54,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  textSm: {
    fontSize: 13,
    fontWeight: '600',
  },
  textLg: {
    fontSize: 17,
    fontWeight: '700',
  },
  textOutline: {
    color: Colors.primary,
  },
});

export default Button;
