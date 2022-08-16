import React from 'react';
import {globalStyles} from '../../styles/global';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Billing = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.container}>
        <Text>Billing</Text>
      </View>
    </SafeAreaView>
  );
};

export default Billing;
