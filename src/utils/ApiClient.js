import axios from 'axios';
import {getStoredValueForKey, showToast} from './LocalStorage';

export const BASE_URL = 'https://node.dashxdemo.com';

const normalizedHeaders = async (headers = {}) => {
  const userToken = await getStoredValueForKey('userToken');
  // console.log(userToken);
  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  };

  return {
    ...headers,
    ...authHeaders,
  };
};

const processNetworkError = error => {
  if (error?.response?.status === 500) {
    showToast('Internal server error');
  } else {
    showToast('Network error');
  }

  throw error;
};

export const APIGet = async ({endUrl, headers}) => {
  const finalHeaders = await normalizedHeaders(headers);
  // console.log(finalHeaders);
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/${endUrl}`,
      headers: finalHeaders,
    });
    return response.data;
  } catch (error) {
    processNetworkError(error);
  }
};

/** Non Get API call i.e. with body */
const nonGetMethod = async ({endUrl, method, dataObject, headers}) => {
  try {
    const finalHeaders = await normalizedHeaders(headers);

    const response = await axios({
      method,
      url: `${BASE_URL}/${endUrl}`,
      data: JSON.stringify(dataObject),
      headers: finalHeaders,
    });
    return response.data;
  } catch (error) {
    processNetworkError(error);
  }
};

export const APIPut = async ({endUrl, dataObject, headers}) => {
  return await nonGetMethod({
    method: 'PUT',
    endUrl,
    dataObject,
    headers,
  });
};

export const APIPatch = async ({endUrl, dataObject, headers}) => {
  return await nonGetMethod({
    method: 'PATCH',
    endUrl,
    dataObject,
    headers,
  });
};

export const APIPost = async ({endUrl, dataObject, headers}) => {
  return await nonGetMethod({
    method: 'POST',
    endUrl,
    dataObject,
    headers,
  });
};

export const getAllPosts = async () => {
  const response = await APIGet({
    endUrl: 'posts',
  });

  return response.posts || [];
};
