import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/button';
import CheckBox from '../../components/checkBox';
import Header from '../../components/header';
import InputText from '../../components/inputText';
import ModalView from '../../components/modal';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import AppContext from '../../useContext/AppContext';
import {storeValueForKey} from '../../utils/LocalStorage';
import jwt_decode from 'jwt-decode';
import {showToast} from '../../utils/LocalStorage';
import {postmethod} from '../../utils/LocalStorage';

const Login = ({navigation}) => {
  const {setUser, setUserToken} = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState({
    email: false,
    password: false,
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showPassWord = value => {
    setHidePassword(!value);
  };

  const storeDetails = token => {
    let data = jwt_decode(token);
    setUser(data.user);
    setUserToken(token);
  };

  const storeTokenInAsync = async token => {
    storeValueForKey('userToken', token);
  };

  const logIn = async () => {
    setIsModalVisible(true);
    const response = await postmethod({
      endUrl: 'login',
      dataObject: {email: email, password: password},
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      showToast('Signed In successfully');
      const token = response.data.token;
      storeDetails(token);
      storeTokenInAsync(token);
    } else {
      setIsModalVisible(false);
      if (response.response.status === 401) {
        showToast('Incorrect email or password');
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
      logIn();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Header title={'Sign in to your Account'} />
          <View style={styles.textInputAndButtonView}>
            <InputText
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
              placeholder={'Password'}
              onChangeText={setPassword}
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
              text={'Login'}
            />
            <Button
              onPress={() => navigation.navigate('Registration')}
              backgroundColor={'white'}
              textColor={'blue'}
              text={'Register'}
              borderColor={'blue'}
              borderWidth={1}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ContactUsScreen')}>
                <Text style={{...styles.forgotPasswordText, marginTop: 20}}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ModalView visible={isModalVisible} />
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
  textInputAndButtonView: {
    flex: 1,
    // backgroundColor: 'red',
    // alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  forgotPasswordText: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: '500',
    color: 'blue',
  },
});

export default Login;
