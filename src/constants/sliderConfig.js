import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Standardized Slider Configuration
export const SLIDER_CONFIG = {
  // Main Banner Slider (used in HomeScreen, Safari, etc.)
  BANNER: {
    WIDTH: width * 0.95,
    HEIGHT: width * 0.95 * 0.45, // 16:9 aspect ratio
    BORDER_RADIUS: 10,
    MARGIN_HORIZONTAL: 10,
  },
  
  // Package Card Slider (used in HomeScreen horizontal lists)
  PACKAGE_CARD: {
    WIDTH: width * 0.65,
    HEIGHT: 240,
    BORDER_RADIUS: 12,
    MARGIN_RIGHT: 16,
  },
  
  // Destination Slider (used in MaldivesPackages, TopDestination)
  DESTINATION: {
    WIDTH: width * 0.9,
    HEIGHT: width * 0.9 * 0.6, // 5:3 aspect ratio
    BORDER_RADIUS: 10,
    MARGIN_HORIZONTAL: 15,
  },
  
  // Things To Do Slider (used in MaldivesPackages)
  THINGS_TO_DO: {
    WIDTH: width - 40, // Full width minus padding
    HEIGHT: 300,
    BORDER_RADIUS: 10,
    MARGIN_RIGHT: 10,
  },
  
  // Famous Places Slider (used in MaldivesPackages)
  FAMOUS_PLACES: {
    WIDTH: width * 0.8,
    HEIGHT: 380,
    BORDER_RADIUS: 10,
    MARGIN_RIGHT: 15,
  },
  
  // Package Details Slider (used in PakageDetails)
  PACKAGE_DETAILS: {
    WIDTH: width,
    HEIGHT: 300,
    BORDER_RADIUS: 0, // No border radius for full-width images
  },
  
  // Multi-Center Deals Grid (used in various screens)
  MULTI_CENTER_GRID: {
    CARD_WIDTH: width * 0.47,
    CARD_HEIGHT: 280,
    CARD_IMAGE_HEIGHT: 280 * 0.65,
    CARD_MARGIN: 8,
  },
};

// Auto-scroll intervals
export const AUTO_SCROLL_INTERVALS = {
  BANNER: 3000, // 3 seconds
  DESTINATION: 3000, // 3 seconds
  THINGS_TO_DO: 4000, // 4 seconds
};

// Pagination dot styles
export const PAGINATION_STYLES = {
  DOT_SIZE: 8,
  ACTIVE_DOT_SIZE: 12,
  DOT_MARGIN: 4,
  DOT_COLOR: 'rgba(255, 255, 255, 0.5)',
  ACTIVE_DOT_COLOR: 'white',
  CONTAINER_PADDING: 15,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  SMALL: width < 375, // iPhone SE, small Android
  MEDIUM: width >= 375 && width < 414, // iPhone 12, most Android
  LARGE: width >= 414, // iPhone 12 Pro Max, large Android
};

// Get responsive dimensions based on screen size
export const getResponsiveDimensions = (type) => {
  const config = SLIDER_CONFIG[type];
  if (!config) return SLIDER_CONFIG.BANNER;
  
  if (BREAKPOINTS.SMALL) {
    return {
      ...config,
      WIDTH: config.WIDTH * 0.95,
      HEIGHT: config.HEIGHT * 0.95,
    };
  } else if (BREAKPOINTS.LARGE) {
    return {
      ...config,
      WIDTH: config.WIDTH * 1.05,
      HEIGHT: config.HEIGHT * 1.05,
    };
  }
  
  return config;
};

export default SLIDER_CONFIG; 