import {TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputText = props => {
  const {
    placeholder,
    onChangeText,
    secureText,
    error,
    firstTextInput,
    value,
    editable,
    keyboardType,
    autoCapitalize,
    onFocus,
  } = props;
  return (
    <TextInput
      keyboardType={keyboardType}
      secureTextEntry={secureText}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      onFocus={onFocus}
      style={[
        styles.textInputStyle,
        {borderColor: error === false || error === true ? 'grey' : 'red'},
        {marginTop: firstTextInput ? 0 : 20},
      ]}
      autoCapitalize={autoCapitalize}
    />
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default InputText;
