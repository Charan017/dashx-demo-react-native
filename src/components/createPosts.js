import React, {useState, useContext} from 'react';
import {
  Text,
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import InputText from './inputText';
import Button from './button';
import AppContext from '../useContext/AppContext';
import ShowError from './showError';
import validate from './validator';
import {showToast} from '../utils/LocalStorage';
import {postmethod} from '../utils/LocalStorage';

const CreatePosts = ({visible, handleModal, getAllPosts}) => {
  const {userToken} = useContext(AppContext);
  const [newPost, setNewPost] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    newPost: false,
  });

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
    handleModal(false);
    const response = await postmethod({
      endUrl: 'posts',
      dataObject: {text: newPost, image: null, video: null},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status === 200) {
      showToast('Successfully Posted');
      getAllPosts();
    } else {
      if (response?.response?.status === 422) {
        showToast('Missing field text');
      } else if (response?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
    setNewPost();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.innerContainer}>
            <Text style={styles.createPost}>Create a Post</Text>
            <Text style={styles.text}>Text</Text>
            <InputText
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
            />
            <ShowError message={errorMessage.newPost} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                onPress={() => {
                  handleModal(false);
                }}
                backgroundColor={'white'}
                borderWidth={1}
                text={'Cancel'}
                textColor={'black'}
              />
              <Button
                onPress={validation}
                text={'Post'}
                textColor={'white'}
                style={{paddingHorizontal: 23}}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default CreatePosts;
