import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StatusBar} from 'react-native';
import HomeStack from './src/routes/HomeStack';
import Navigator from './src/routes/loginStack';
import AppContext from './src/useContext/AppContext';
import {getStoredValueForKey, storeValueForKey} from './src/utils/LocalStorage';

function App() {
  const [isProcessed, setIsProcessed] = useState(false);
  const [getPost, setGetPost] = useState({});

  const [user, updateUser] = useState();
  const [userToken, setUserToken] = useState('');
  const isLoggedIn = useMemo(() => !!user);

  const setUser = user => {
    storeValueForKey('user', user ? JSON.stringify(user) : null);
    updateUser(user);
  };

  useEffect(() => {
    (async () => {
      const storedUserToken = await getStoredValueForKey('userToken');
      const storedUser = await getStoredValueForKey('user');
      updateUser(storedUser);
      setUserToken(storedUserToken);

      setIsProcessed(true);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        userToken,
        setUserToken,
        user,
        setUser,
        getPost,
        setGetPost,
      }}>
      <NavigationContainer>
        <StatusBar translucent backgroundColor={'white'} />
        {isProcessed && isLoggedIn && <HomeStack />}
        {isProcessed && !isLoggedIn && <Navigator />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
