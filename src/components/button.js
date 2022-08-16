import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BUTTON_BACKGROUND_COLOR_PRIMARY} from '../styles/global';

const Button = ({
  onPress,
  backgroundColor,
  textColor,
  text,
  borderColor,
  borderWidth,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: backgroundColor || BUTTON_BACKGROUND_COLOR_PRIMARY,
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: borderColor,
        borderWidth: borderWidth,
        ...style,
      }}>
      <Text style={{...styles.text, color: textColor}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Button;
