import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import InputText from '../../components/inputText';
import ShowError from '../../components/showError';
import validate from '../../components/validator';
import ModalView from '../../components/modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Button from '../../components/button';
import {showToast} from '../../utils/LocalStorage';
import {postmethod} from '../../utils/LocalStorage';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [modal, setModal] = useState(false);

  const storeEmail = value => {
    setEmail(value);
  };

  const forgot = async () => {
    setModal(true);

    const response = await postmethod({
      endUrl: 'forgot-password',
      dataObject: {email: email},
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
      setModal(false);
      showToast('link was sent to your mail');
    } else {
      setModal(false);
      if (response?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  const validation = () => {
    let validationResponse = validate('email', email);
    setErrorMessage(validationResponse);
    if (validationResponse === true) {
      forgot();
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
          <Header title={'Forgot Password'} />
          <View style={styles.textInputAndButton}>
            <InputText
              placeholder={'Email'}
              onChangeText={storeEmail}
              firstTextInput={true}
              error={errorMessage}
              keyboardType={'email-address'}
              onFocus={() => {
                setErrorMessage(false);
              }}
            />
            <ShowError message={errorMessage} />
            <Button
              onPress={() => {
                validation();
                Keyboard.dismiss();
              }}
              backgroundColor={'blue'}
              textColor={'white'}
              text={'Submit'}
            />
            <View style={styles.backToLoginView}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInputAndButton: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },
  backToLoginView: {
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: '500',
    marginTop: 30,
  },
});

export default ForgotPasswordScreen;
