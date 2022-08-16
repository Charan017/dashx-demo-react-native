import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const ModalView = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <LottieView
            style={styles.lottieView}
            source={require('../assets/loading.json')}
            autoPlay
            loop
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'center',
  },
  lottieView: {
    width: 50,
    height: 50,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

export default ModalView;
