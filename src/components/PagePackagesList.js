import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity, Text, FlatList, SafeAreaView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import { COLORS, SHADOWS, mainStyles } from '../constants/theme';
import StarSVG from '../assets/images/starS.svg';
import PropTypes from 'prop-types';

const PagePackagesList = memo(
  ({ title = null, seeAllLinkPress = null, loading = false, page, packages = [], city = null, days = null }) => {
    // Render skeleton placeholder during loading
    if (loading) {
      return (
        <SkeletonPlaceholder>
           <SkeletonPlaceholder.Item
                width="100%"
                height={50}
                borderRadius={12}
                marginRight={15}
              />
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            {[...Array(2)].map((_, index) => (
              <SkeletonPlaceholder.Item
                key={`skeleton-${index}`}
                width={220}
                height={220}
                borderRadius={12}
                marginRight={15}
              />
            ))}
          </View>
        </SkeletonPlaceholder>
      );
    }

    // Return null if page is not provided
    if (!page) {
      return null;
    }

    // Render individual package card
    const packageCard = useCallback(
      ({ item }) => (
        <View
          style={{
            ...SHADOWS.medium,
            flexDirection: 'column',
            width: 220,
            backgroundColor: COLORS.white,
            borderRadius: 15,
            overflow: 'hidden',
          }}
        >
          <FastImage
            source={{ uri: item?.main_image }}
            style={{
              width: 220, // Match container width
              height: 150,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{ flexDirection: 'column', padding: 10 }}>
            <TouchableOpacity onPress={() => { /* Add navigation or action here */ }}>
              <Text style={{ ...mainStyles.postTitle, textAlign: 'left' }}>
                {item?.title?.length > 60 ? `${item.title.slice(0, 60)}...` : item?.title || 'Untitled'}
              </Text>
            </TouchableOpacity>
            {city && item?.city && (
              <Text style={{ color: COLORS.secondary, textAlign: 'left', lineHeight: 22, fontSize: 14 }}>
                {item.city.length > 50 ? `${item.city.slice(0, 50)}...` : item.city}
              </Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={mainStyles.price}>
                £ {item?.sale_price || item?.price || 'N/A'}{' '}
                <Text style={mainStyles.priceSpan}>
                  /{days ? item?.duration : item?.packagetype === 'pp' ? 'per person' : item?.packagetype || 'N/A'}
                </Text>
              </Text>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <StarSVG width={20} height={20} style={mainStyles.starRating} />
                <Text style={mainStyles.rating}>
                  {item?.rating ? Number(item.rating).toFixed(1) : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ),
      [city, days] // Dependencies for useCallback
    );

    return (
      <View>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={mainStyles.heading}>{title || 'Packages'}</Text>
          {seeAllLinkPress && (
            <TouchableOpacity onPress={seeAllLinkPress}>
              <Text style={mainStyles.link}>See all</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* FlatList */}
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Fallback for missing id
          renderItem={packageCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingVertical: 10, paddingRight:10 }}
        />
      </View>
    );
  }
);
export default PagePackagesList;