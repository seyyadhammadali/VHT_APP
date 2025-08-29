import { useNavigation } from '@react-navigation/native';

export const useDrawerNavigation = () => {
  const navigation = useNavigation();
  // 'ddrawer' is the ID you've given to your Drawer.Navigator.
  // getParent() will look for the nearest parent navigator with that ID.
  // In your case, the Drawer is a sibling, not a parent, so we need a different approach.
  
  // The correct way to do this is to get the top-level navigation object
  // and dispatch the action to it. The top-level navigator will then
  // route the action to the correct sub-navigator.
  return navigation.getParent('ddrawer');
};