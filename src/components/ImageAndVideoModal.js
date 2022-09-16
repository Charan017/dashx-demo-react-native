import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

export const ImageAndVideoModal = ({visible, setModal, imageOrVideoUri}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModal(false)}>
            <Image
              style={styles.closeImage}
              source={require('../assets/Close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 9}}>
          {imageOrVideoUri.mediaType === 'image' ? (
            <Image
              style={styles.imageStyle}
              source={{uri: imageOrVideoUri.uri}}
            />
          ) : (
            <Video
              controls={true}
              paused={true}
              style={styles.videoStyle}
              source={{uri: imageOrVideoUri.uri}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoStyle: {
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeImage: {
    width: 16,
    height: 16,
    tintColor: 'lightgrey',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
  },
});
