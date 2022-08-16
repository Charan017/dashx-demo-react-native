import React from 'react';
import {globalStyles} from '../../styles/global';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Settings = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={globalStyles.container}>
        <Text>Settings Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
