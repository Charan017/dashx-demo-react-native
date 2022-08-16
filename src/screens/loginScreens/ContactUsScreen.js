import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import InputText from '../../components/inputText';
import Button from '../../components/button';
import validate from '../../components/validator';
import ShowError from '../../components/showError';
import {postmethod} from '../../utils/LocalStorage';
import {showToast} from '../../utils/LocalStorage';
import ModalView from '../../components/modal';

const ContactUsScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPost, setMessage] = useState('');
  const [inputField, setInputField] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    name: false,
    email: false,
    newPost: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const contactUs = async () => {
    setIsModalVisible(true);
    const response = await postmethod({
      endUrl: 'contact',
      dataObject: {
        name: name,
        email: email,
        feedback: newPost,
      },
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      showToast('Thanks for reaching out! We will get back to you soon.');
    } else {
      if (response?.response?.status === 500) {
        showToast('Internal server error');
      }
    }
    setName();
    setEmail();
    setMessage();
  };

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
      contactUs();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <ModalView visible={isModalVisible} />
          <Header title={'Contact Us'} />
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}>
            <InputText
              value={name}
              placeholder={'Name'}
              onChangeText={setName}
              //   onChangeText={setInputField}
              keyboardType={'default'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    name: true,
                  };
                });
              }}
              error={errorMessage.name}
            />
            <ShowError message={errorMessage.name} />
            <InputText
              value={email}
              placeholder={'Email'}
              onChangeText={setEmail}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    email: true,
                  };
                });
              }}
              error={errorMessage.email}
            />
            <ShowError message={errorMessage.email} />
            <InputText
              value={newPost}
              placeholder={'Send us a message'}
              onChangeText={setMessage}
              keyboardType={'default'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    newPost: true,
                  };
                });
              }}
              error={errorMessage.newPost}
            />
            <ShowError message={errorMessage.newPost} />

            <Button
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              text={'Submit'}
              textColor="white"
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'blue',
                  }}>
                  Go back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ContactUsScreen;
