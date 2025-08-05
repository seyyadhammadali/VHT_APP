
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const visibleRoutes = state.routes.slice(1); // Exclude the first route (Home)

    const getIcon = (routeName, focused) => {
        let iconSource;
        let focusedIconSource;

        if (routeName === 'Inquire') {
            iconSource = require('../assets/images/inquiry.png');
            focusedIconSource = require('../assets/images/whiteInquiry.png');
        } else if (routeName === 'SpecialOffers') {
            iconSource = require('../assets/images/specialOffer.png');
            focusedIconSource = require('../assets/images/specialOfferWhite.png');
        } else if (routeName === 'LiveChat') {
            iconSource = require('../assets/images/blackLiveChat.png');
            focusedIconSource = require('../assets/images/WhhiteLiveChat.png');
        } else if (routeName === 'Review') {
            iconSource = require('../assets/images/reviewIcon.png');
            focusedIconSource = require('../assets/images/reviewWhite.png');
        }
        return (
            <View
                style={[
                    styles.iconContainer,
                    focused && styles.iconContainerFocused
                ]}>
                <FastImage
                    source={focused ? focusedIconSource : iconSource}
                    style={styles.tabIcon}
                    resizeMode="contain"
                />
            </View>
        );
    };

    return (
        <View style={styles.tabBarContainer}>
            {visibleRoutes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index + 1; // +1 because we sliced the first route

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        {getIcon(route.name, isFocused)}
                        <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor:'white',
        position: 'absolute',
        bottom: 0,
        height: 60,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        justifyContent: 'space-around', 
        alignItems: 'center',
        width: "100%",
        paddingBottom: 5,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        flexDirection: 'column', 
    },
    tabIcon: {
        width: 24,
        height: 24,
        // Removed marginTop to allow the icon to be centered by the parent view
    },
    iconContainer: {
        width: 65,
        height: 35,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignItems: 'center', // Centers the child (icon) horizontally
        justifyContent: 'center', // Centers the child (icon) vertically
    },
    iconContainerFocused: {
        backgroundColor: '#C28D3E',
        borderRadius: 10,
        // The default `iconContainer` already has width, height, and centering properties.
        // We only need to override the background color.
    },
    tabLabel: {
        fontSize: 10,
        color: 'gray',
        marginTop: 4, 
    },
    tabLabelFocused: {
        color: '#C28D3E',
    }
});
export default CustomTabBar;