import { StyleSheet } from 'react-native';

const COLORS = {
  themeBg:'hsla(0, 0%, 100%, 1)',
  primary:'hsla(36, 52%, 50%, 1)',
  secondary:'hsla(0, 0%, 53%, 1)',
  danger:'hsla(0, 80%, 47%, 1)',
  dangerlight: 'hsla(0, 80%, 63%, 1)',
  info:'hsla(201, 56%, 65%, 1)',
  subHeading: '#0069CA',
  white: '#fff',
  black: 'hsla(0, 0%, 0%, 1)',
  dark: 'hsla(0, 0%, 14%, 1)',
  gray: 'hsla(0, 0%, 53%, 1)',
  headingBg: '#01BE9E14',
  primaryBg: 'hsla(36, 52%, 50%, 1)',
  primaryBgLight: 'hsla(36, 52%, 50%, 0.08)',
  darkBg:'hsla(0, 0%, 14%, 1)',
  secondaryBg:'hsla(0, 0%, 53%, 0.11)',
  infoBg:'hsla(209, 100%, 40%, 0.08)',
  successBG: 'hsla(170, 99%, 37%, 0.12)',
  white: '#fff',
  black: '#000',
  gray: '#888888',
  lightGray: '#F6F6F6',
  darkGray: '#333',
  mediumGray: '#666',
  borderGray: '#ccc',
  borderGrayLight: '#E0E0E0',
  borderGrayLighter: '#eee',
  red: '#d21e1e',
  brightRed: '#EC1C24',
  green: '#189900',
  blue: '#0069CA',
  orange: '#f97316',
  gold: '#C28D3E',
  goldLight: '#C28D3E1F',
  goldTable: '#C28D3E',
  goldTableAlt: '#EFE5D3',
  blueSky: '#E0F7FA',
  teal: '#00796B',
  yellow: '#f9c130',
};

const SPACING = {
  screen: 20,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
const FONT_FAMILY = {
  semiBold: 'Montserrat',
}
const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

const RADIUS = {
  xs: 4,
  sm: 6,
  md: 12,
  lg: 20,
  round: 50,
};

const SHADOWS = {
   light: {
    shadowColor: 'hsla(240, 48%, 20%, 0.18)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 45 / 8, // ~5.6 for smooth blur
    elevation: 5, // Android support
  },
  medium: {
    shadowColor: 'hsla(240, 48%, 20%, 0.18)', // Shadow color
    shadowOffset: { width: 0, height: 2 },    // Horizontal & vertical offset
    shadowOpacity: 0.18,                      // Opacity (match HSLA alpha)
    shadowRadius: 10,                         // Blur radius (45px / 2 approx.)
    elevation: 10,     
  },
  heavy: {
    shadowColor: 'hsla(0, 0%, 53%, 0.2)',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 25,
  },
};

const mainStyles = StyleSheet.create({
  safeArea:{flex:1, backgroundColor:COLORS.themeBg},
  container:{
    flex:1,
  },
  contentContainer:{
    marginTop:20, 
    paddingHorizontal:20,
    gap:20,
    paddingBottom:100
  },
  btnPrimary: {
    backgroundColor: COLORS.primaryBg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    justifyContent: 'center',
    // ...SHADOWS.medium,
  },
  btnPrimaryText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },

  btnSecondary: {
    backgroundColor: COLORS.secondaryBg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    justifyContent: 'center',
    // ...SHADOWS.medium,
  },
  btnSecondaryText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },

  btnDefault: {
    backgroundColor: COLORS.darkBg,
    // paddingVertical: SPACING.lg,
    // paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.xs,
    // alignItems: 'center',
    // justifyContent: 'center',
    // color: COLORS.white,
    // ...SHADOWS.medium,
  },
  btnDefaultText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  heading:{
    color: COLORS.dark || '#000',
    fontWeight: 600,
    fontSize:20,
    letterSpacing:0,
    lineHeight:25,
    fontFamily: 'Montserrat-SemiBold',
  },
  contentHeading:{
    padding:8,
    backgroundColor: COLORS.goldLight,
    color: COLORS.dark || '#000',
    fontWeight: 500,
    fontSize:16,
    letterSpacing:0,
    lineHeight:25,
    fontFamily: 'Inter-Medium',
    textAlign:'center'
  },
  headerTitle:{
    color: COLORS.light || '#fff',
    fontWeight: 600,
    fontSize:20,
    letterSpacing:0,
    lineHeight:25,
    fontFamily: 'Montserrat-SemiBold',
  },
  link:{
    color: COLORS.secondary,
    fontWeight: 500,
    letterSpacing:0,
    fontSize:16,
    fontFamily:'Inter-Medium'
  },
  postTitle:{
    color: COLORS.dark,
    fontWeight: 500,
    letterSpacing:0,
    fontSize:16,
    fontFamily:'Inter-Medium'
  },
  price:{
    color:COLORS.primary, 
    fontWeight:700, 
    fontSize:16, 
    letterSpacing:0,
    fontFamily:'Inter-Bold',
    lineHeight:20
  },
  priceSpan:{
    color:COLORS.secondary, 
    fontWeight:400, 
    fontSize:14, 
    letterSpacing:0,
    fontFamily:'Inter-Regular',
    lineHeight:20
  },
  starRating:{
  },
  rating:{
    color:COLORS.black,
    fontWeight:700,
    fontSize:14,
    fontFamily:'Montserrat-Bold'
  }
});

export { COLORS, SPACING, FONT_SIZES, RADIUS, SHADOWS, mainStyles };
