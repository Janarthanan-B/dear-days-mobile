import React from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';

interface DividerProps {
  height?: DimensionValue;
  width?: DimensionValue;
  backgroundColor?: string;
  orientation?: 'vertical' | 'horizontal';
}

const Divider: React.FC<DividerProps> = ({
  height = '60%',
  width = 1,
  backgroundColor = 'gray',
  orientation = 'vertical',
}) => {
  return (
    <View
      style={[
        styles.divider,
        orientation === 'vertical'
          ? [styles.vertical, { height, width, backgroundColor }]
          : [styles.horizontal, { height: width, backgroundColor }],
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
  vertical: {
    alignSelf: 'center',
  },
  horizontal: {
    width: '100%',
    alignSelf: 'stretch',
  },
});

export default Divider;
