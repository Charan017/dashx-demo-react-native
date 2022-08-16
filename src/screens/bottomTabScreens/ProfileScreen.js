import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BASE_URL} from '../../constants/APIClient';
import Button from '../../components/button';
import InputText from '../../components/inputText';
import ModalView from '../../components/modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import AppContext from '../../useContext/AppContext';
import {showToast} from '../../utils/LocalStorage';
import DocumentPicker from 'react-native-document-picker';
import {patchMethod} from '../../utils/LocalStorage';
import {getMethod} from '../../utils/LocalStorage';

const Profile = () => {
  const {userToken, user, setUser} = useContext(AppContext);

  const [errorMessage, setErrorMessage] = useState({
    email: false,
    first_name: false,
    last_name: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [tempUser, setTempUser] = useState(user || {});

  const updateField = fieldKey => fieldValue => {
    setTempUser(old => ({
      ...old,
      [fieldKey]: fieldValue,
    }));
  };

  const updateProfile = async () => {
    setIsModalVisible(true);
    const response = await patchMethod({
      endUrl: 'update-profile',
      dataObject: tempUser,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer '.concat(userToken),
      },
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      showToast('Profile Successfully Updated');
      setUser(response.data.user);
    } else {
      setIsModalVisible(false);
      if (error?.response?.status === 401) {
        showToast('Unauthorized');
      } else if (error?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  const validation = () => {
    let count = 0;
    for (let key in errorMessage) {
      let validationResponse = validate(key, tempUser[key]);
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
      updateProfile();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ModalView visible={isModalVisible} />
          <View style={styles.titleView}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.avatar}>
            <Image style={{width: 80, height: 80, borderRadius: 40}} />
            <TouchableOpacity
              style={{position: 'absolute', right: 0, bottom: 0}}>
              <Image
                style={styles.imageLogo}
                source={require('../../assets/addPhoto.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textFieldView}>
            <InputText
              onChangeText={updateField('first_name')}
              value={tempUser.first_name}
              error={errorMessage.first_name}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    first_name: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.first_name} />
            <InputText
              onChangeText={updateField('last_name')}
              value={tempUser.last_name}
              error={errorMessage.last_name}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    last_name: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.last_name} />
            <InputText
              onChangeText={updateField('email')}
              value={tempUser.email}
              error={errorMessage.email}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    email: true,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.email} />
            <Button
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              textColor={'white'}
              text={'Update'}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalStack: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  titleView: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'lightgrey',
    alignSelf: 'center',
    marginTop: 20,
  },
  imageLogo: {
    width: 30,
    height: 30,
  },
  textFieldView: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
});

export default Profile;
