import { useWindowDimensions } from 'react-native';

export default function useIsSmallScreen() {
  const screenWidth = useWindowDimensions().width;
  return screenWidth < 375;
}
