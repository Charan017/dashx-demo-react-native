import React, {useState} from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CheckBox = ({onPress, value}) => {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        setSelected(value);
        onPress(value);
      }}>
      <Image
        style={styles.image}
        source={
          selected === true
            ? require('../assets/selectBox.png')
            : require('../assets/unselectBox.png')
        }
      />
      <Text style={styles.text}>Show Password</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    marginTop: 9,
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    marginTop: 3,
    marginLeft: 5,
    color: 'black',
  },
});

export default CheckBox;
