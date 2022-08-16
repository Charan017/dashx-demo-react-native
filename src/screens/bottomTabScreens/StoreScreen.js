import React from 'react';
import {globalStyles} from '../../styles/global';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const StoreScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.container}>
        <Text>Store</Text>
      </View>
    </SafeAreaView>
  );
};

export default StoreScreen;
