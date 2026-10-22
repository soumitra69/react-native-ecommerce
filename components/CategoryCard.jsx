import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {
  CATEGORY_IMAGES,
  CATEGORY_ICONS,
  PLACEHOLDER_BLURHASH,
} from '../constants/Images';

const CategoryCard = memo(function CategoryCard({
  category,
  selected = false,
  onPress,
  variant = 'pill',
}) {
  const iconName = CATEGORY_ICONS[category] || 'pricetag-outline';
  const imageUri = CATEGORY_IMAGES[category];

  if (variant === 'circle') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress?.(category)}
        style={styles.circleWrapper}
      >
        <View
          style={[
            styles.circleImageContainer,
            selected && styles.circleImageSelected,
          ]}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
              contentFit="cover"
              transition={200}
              style={styles.circleImage}
            />
          ) : (
            <Ionicons
              name={iconName}
              size={24}
              color={selected ? Colors.primary : Colors.textSecondary}
            />
          )}
        </View>
        <Text
          style={[styles.circleLabel, selected && styles.circleLabelSelected]}
          numberOfLines={1}
        >
          {category}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress?.(category)}
      style={[styles.pill, selected && styles.pillActive]}
    >
      <Ionicons
        name={iconName}
        size={15}
        color={selected ? Colors.white : Colors.textSecondary}
        style={styles.pillIcon}
      />
      <Text style={[styles.pillText, selected && styles.pillTextActive]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 10,
    borderRadius: 22,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.white,
  },
  circleWrapper: {
    alignItems: 'center',
    marginRight: 16,
    width: 68,
  },
  circleImageContainer: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.borderLight,
    marginBottom: 6,
  },
  circleImageSelected: {
    borderColor: Colors.primary,
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  circleLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  circleLabelSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default CategoryCard;
