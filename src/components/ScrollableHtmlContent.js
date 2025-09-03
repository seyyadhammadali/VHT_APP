
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { COLORS, mainStyles } from '../constants/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ScrollableHtmlContent = ({ htmlContent, heading='', tagsStyles, loading=null, alignment='center' , boxHeight='auto'}) => {
  const { width } = useWindowDimensions();
  const [containerHeight, setContainerHeight] = useState(1);
  const [contentHeight, setContentHeight] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const thumbHeight = Math.max( (containerHeight / contentHeight) * containerHeight,  30,);
  const maxThumbPosition = containerHeight - thumbHeight;
  const thumbPosition = Math.min( (scrollPosition / (contentHeight - containerHeight)) * maxThumbPosition || 0, maxThumbPosition,);
  const source = { html: htmlContent };
  const contentHeading = heading.replace(/<[^>]*>/g, '').trim();
  const defaultTagsStyles = {
   p: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 0,
      paddingBottom: 0,
      textAlign:alignment,
      fontWeight:400
    },
    h1: { textAlign:alignment,fontSize: 14, fontWeight: 'bold', color: COLORS.subHeading },
    h2: { textAlign:alignment,fontSize: 14, fontWeight: 'bold', color: COLORS.subHeading },
    h3: { textAlign:alignment,fontSize: 14, fontWeight: 'bold', color: COLORS.subHeading },
    strong: { fontWeight: 'bold', color: COLORS.subHeading },
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
    },
    ...tagsStyles
  };
  if(loading){
    return(
      <>
       <SkeletonPlaceholder >
        <SkeletonPlaceholder.Item
          width="100%"
          height={50}
          borderRadius={10}
          alignSelf="center"
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width="100%"
          height={100}
          borderRadius={10}
          alignSelf="center"
        />
      </SkeletonPlaceholder>
      </>
    );
  }
  return (
    <View>
      {heading?(
        <Text style={mainStyles.contentHeading}>{contentHeading.length > 38 ? `${contentHeading.slice(0,36)}...`:contentHeading}</Text>
      ):''}
      <View style={{...styles.scrollableDescriptionWrapper, height:boxHeight}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  scrollableDescriptionWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 10,
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
    alignSelf: 'flex-end',
  },
  customScrollbarThumb: {
    width: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    position: 'absolute',
    left: 0,
  },
});

export default ScrollableHtmlContent;