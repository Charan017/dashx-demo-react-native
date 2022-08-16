import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import InputText from '../../components/inputText';
import axios from 'axios';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import ModalView from '../../components/modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Button from '../../components/button';
import CheckBox from '../../components/checkBox';
import {BASE_URL} from '../../constants/APIClient';
import {showToast} from '../../utils/LocalStorage';
import {postmethod} from '../../utils/LocalStorage';

export default function RegistrationScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [modal, setModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const storeFirstName = value => {
    setFirstName(value);
  };

  const storeLastName = value => {
    setLastName(value);
  };

  const storeEmail = value => {
    setEmail(value);
  };

  const storePassword = value => {
    setPassWord(value);
  };

  const showPassWord = value => {
    setHidePassword(!value);
  };

  const register = async () => {
    setModal(true);
    const response = await postmethod({
      endUrl: 'register',
      dataObject: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      },
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 201) {
      setModal(false);
      showToast(response.data.message);
    } else {
      setModal(false);
      if (response.response.status === 409) {
        showToast('Email already exist');
      } else if (response.response.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
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
      register();
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ModalView visible={modal} />
          <Header title={'Register'} />
          <View style={styles.inputTextAndButtonView}>
            <InputText
              placeholder={'First Name'}
              onChangeText={storeFirstName}
              error={errorMessage.firstName}
              firstTextInput={true}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    firstName: false,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.firstName} />
            <InputText
              placeholder={'Last Name'}
              onChangeText={storeLastName}
              error={errorMessage.lastName}
              autoCapitalize={'words'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    lastName: false,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.lastName} />
            <InputText
              placeholder={'Email'}
              onChangeText={storeEmail}
              error={errorMessage.email}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    email: false,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.email} />
            <InputText
              placeholder={'Password'}
              onChangeText={storePassword}
              secureText={hidePassword}
              error={errorMessage.password}
              onFocus={() => {
                setErrorMessage(prev => {
                  return {
                    ...prev,
                    password: false,
                  };
                });
              }}
            />
            <ShowError message={errorMessage.password} />
            <CheckBox onPress={showPassWord} value={hidePassword} />
            <Button
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              backgroundColor={'blue'}
              textColor={'white'}
              text={'Register'}
            />
            <Button
              onPress={() => navigation.navigate('Login')}
              backgroundColor={'white'}
              textColor={'blue'}
              text={'Log in'}
              borderColor={'blue'}
              borderWidth={1}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputTextAndButtonView: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },
  registerStyle: {
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  LogIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  logo: {
    marginRight: 10,
    width: 50,
    height: 50,
  },
});
