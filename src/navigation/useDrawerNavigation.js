import { useNavigation } from '@react-navigation/native';

export const useDrawerNavigation = () => {
  const navigation = useNavigation();

  // Find the parent drawer navigator
  const drawerParent = navigation.getParent('ddrawer');
  
  if (drawerParent) {
    return drawerParent;
  }
  
  // If not found, return null or the default navigation object
  // depending on your use case. Returning the default navigation
  // object can be useful for other actions.
  return navigation;
};