import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 50}}>
        <Image
          style={styles.logo}
          source={require('../assets/dashXLogo.png')}
        />
        <Text style={styles.demoAppText}>Demo App</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    marginRight: 20,
    width: 35,
    height: 35,
  },
  demoAppText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Header;
