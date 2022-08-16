import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../constants/APIClient';
import {ToastAndroid} from 'react-native';

export const showToast = responseData => {
  ToastAndroid.show(responseData, ToastAndroid.SHORT);
};

export const storeValueForKey = (key, value) => {
  if (value) {
    AsyncStorage.setItem(key, value);
  } else {
    AsyncStorage.removeItem(key);
  }
};

export const getStoredValueForKey = async key => {
  const value = await AsyncStorage.getItem(key);
  if (!!value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } else {
    return value;
  }
};

export const getAllPosts = async (setIsModalVisible, setGetPost, userToken) => {
  setIsModalVisible(true);
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/posts`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    setIsModalVisible(false);
    setGetPost(response.data);
  } catch (error) {
    if (error?.response?.status === 500) {
      showToast('Internal server error');
    } else {
      showToast('Network error');
    }
  }
};

export const getMethod = async ({endUrl, headers}) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/${endUrl}`,
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const putMethod = async ({endUrl, headers}) => {
  try {
    const response = await axios({
      method: 'PUT',
      url: `${BASE_URL}/${endUrl}`,
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const patchMethod = async ({endUrl, dataObject, headers}) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postmethod = async ({endUrl, dataObject, headers}) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
