import React, {useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {APIPost} from '../utils/ApiClient';
import {showToast} from '../utils/LocalStorage';
import Button from './Button';
import InputText from './InputText';
import ErrorMessage from './ErrorMessage';
import validate from './validator';
import {FilePickerActionSheet} from './ActionSheet';
import DashX from '@dashx/react-native';

export const CreatePostModal = ({visible, dismissModal}) => {
  const [newPost, setNewPost] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    newPost: false,
  });
  const [storePostImage, setStorePostImage] = useState();
  const [storePostVideo, setStorePostVideo] = useState();
  const [mediaType, setMediaType] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);

  const validation = () => {
    let count = 0;

    for (let key in errorMessage) {
      let validationResponse = validate(key, eval(key));
      setErrorMessage(prev => {
        return {
          ...prev,
          [key]: validationResponse,
        };
      });
      if (validationResponse !== true) {
        break;
      } else {
        count += 1;
      }
    }
    if (count === Object.keys(errorMessage).length) {
      createPost();
    }
  };

  const createPost = async () => {
    setRequestInProgress(true);
    await APIPost({
      endUrl: 'posts',
      dataObject: {
        text: newPost,
        image: storePostImage?.postImage,
        video: null,
      },
    });
    setRequestInProgress(false);

    showToast('Successfully Posted');

    dismissModal?.(true);

    // Reset post text
    setNewPost();
  };

  const onPickPostImage = async pickedMedia => {
    setShowActionSheet(false);
    console.log(pickedMedia);

    try {
      if (mediaType === 'image') {
        const response = await DashX.uploadExternalAsset(
          pickedMedia,
          'e8b7b42f-1f23-431c-b739-9de0fba3dadf',
        );
        console.log(response);
        setStorePostImage(oldUser => ({
          ...(oldUser || {}),
          postImage: response?.data?.asset,
        }));
      } else {
        const response = await DashX.uploadExternalAsset(
          pickedMedia,
          '651144a7-e821-4af7-bb2b-abb2807cf2c9',
        );
        setStorePostVideo(oldUser => ({
          ...(oldUser || {}),
          postVideo: response?.data?.asset,
        }));
        console.log(response);
      }

      showToast('Asset uploaded');
    } catch (error) {
      console.log(error);
    }
  };

  const selectImageAndVideo = text => {
    setMediaType(text);
    setShowActionSheet(true);
  };

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.innerContainer}>
            {showActionSheet && (
              <FilePickerActionSheet
                onPickFile={onPickPostImage}
                setShowActionSheet={setShowActionSheet}
                mediaType={mediaType}
              />
            )}
            <Text style={styles.createPost}>Create a post</Text>
            <Text style={styles.text}>Text</Text>
            <InputText
              style={styles.postTextInput}
              error={errorMessage.newPost}
              onChangeText={setNewPost}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    newPost: false,
                  };
                });
              }}
              multiline
              numberOfLines={3}
              editable={!requestInProgress}
            />
            <ErrorMessage message={errorMessage.newPost} />
            <ImageAndVideoButton
              text="Select image: "
              buttonText="Choose image"
              imageAndVideoUrl={storePostImage?.postImage?.url}
              button={() => selectImageAndVideo('image')}
            />
            <ImageAndVideoButton
              text="Select video: "
              buttonText="Choose video"
              imageAndVideoUrl={storePostVideo?.postVideo?.url}
              style={{paddingRight: 5}}
              button={() => selectImageAndVideo('video')}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                onPress={dismissModal}
                backgroundColor={'white'}
                borderWidth={1}
                text={'Cancel'}
                textColor={'black'}
              />
              <Button
                onPress={validation}
                text={!requestInProgress ? 'Create' : 'Creating'}
                textColor={'white'}
                style={{paddingHorizontal: 23}}
                disabled={requestInProgress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ImageAndVideoButton = ({
  text,
  buttonText,
  style,
  button,
  imageAndVideoUrl,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Text style={{...style, color: 'black', fontSize: 15}}>{text}</Text>
        <Button
          onPress={button}
          text={buttonText}
          backgroundColor={'whitesmoke'}
          textColor={'black'}
        />
      </View>
      <Text style={{marginBottom: 10}}>{imageAndVideoUrl}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  createPost: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  postTextInput: {
    marginBottom: 20,
    height: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  avatarActivityIndicator: {
    position: 'absolute',
    verticalAlign: 'middle',
    alignSelf: 'center',
  },
});
