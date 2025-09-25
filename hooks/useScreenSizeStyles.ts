import useIsSmallScreen from './useIsSmallScreen';

export default function useScreenSizeStyles({ largeStyles, smallStyles }: any) {
  const isSmallScreen = useIsSmallScreen();
  const mergeStyles = () => {
    //make copy of large styles
    const newStyleTemplate = JSON.parse(JSON.stringify(largeStyles));
    //find large styles with same small style name
    Object.keys(smallStyles).forEach(function (key) {
      //go through style props
      const largeStyleProp = Object.entries(newStyleTemplate).filter(
        ([largeKey]) => `${largeKey}` === key,
      )[0][1];
      //merge small styles over large style props with same name
      newStyleTemplate[key] = {
        ...(largeStyleProp as object),
        ...smallStyles[key],
      };
    });
    return newStyleTemplate;
  };

  return isSmallScreen ? mergeStyles() : largeStyles;
}
