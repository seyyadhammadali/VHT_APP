
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

const ScrollableHtmlContent = ({ htmlContent, tagsStyles }) => {
  const [containerHeight, setContainerHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Calculate thumb properties based on local state
  const thumbHeight = Math.max(
    (containerHeight / contentHeight) * containerHeight,
    30,
  );
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min(
    (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0,
    maxThumbPosition,
  );

    const source = { html: htmlContent };
  const defaultTagsStyles = {
   p: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 0,
      paddingBottom: 0,
    },
    h1: { fontSize: 14, fontWeight: 'bold', color: 'black' },
    h2: { fontSize: 18, fontWeight: 'bold', color: 'black' },
    strong: { fontWeight: 'bold', color: 'darkblue' },
    em: { fontStyle: 'italic' },
    ul: { marginBottom: 5 },
    ol: { marginBottom: 5 },
    li: {
      fontSize: 14,
      color: 'gray',
      marginLeft: 10,
      marginBottom: 3,
    },
    a: {
      color: 'blue',
      textDecorationLine: 'underline',
    }
  };


  return (
    <View style={styles.scrollableDescriptionWrapper}>
      <ScrollView
        style={styles.customScrollArea}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}>
        <RenderHtml
          contentWidth={width}
          source={source}
          tagsStyles={defaultTagsStyles}
        />
      </ScrollView>
      {contentHeight > containerHeight && (
        <View style={styles.customScrollbarTrack}>
          <View
            style={[
              styles.customScrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY: thumbPosition }],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableDescriptionWrapper: {
    flexDirection: 'row',
    height: 200, // You can make this dynamic if needed
    alignSelf: 'center',
    width: '100%',
    padding: 10,
  },
  customScrollArea: {
    flex: 1,
    padding: 0,
  },
  customScrollbarTrack: {
    width: 4,
    height: '100%',
    backgroundColor: '#f5f6fa',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  customScrollbarThumb: {
    width: 4,
    backgroundColor: '#b88a3b',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
});

export default ScrollableHtmlContent;