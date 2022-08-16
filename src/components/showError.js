import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ShowError = ({message}) => {
  return message === false || message === true ? (
    <View></View>
  ) : (
    <Text style={styles.text}>{message}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    color: 'red',
  },
});

export default ShowError;
