import React from 'react';
import {View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomTabScreens/HomeScreen';
import StoreScreen from '../screens/bottomTabScreens/StoreScreen';
import BookmarksScreen from '../screens/bottomTabScreens/BookmarksScreen';
import MoreScreen from '../screens/bottomTabScreens/MoreScreen';

const TabNavigator = createBottomTabNavigator();

const Tabs = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          borderRightColor: 'lightgray',
          borderRightWidth: 1,
        },
        tabBarStyle: {
          borderWidth: 1,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: 'blue',
      }}>
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={require('../assets/home.png')}
                  resizeMode="contain"
                  style={{width: 25, tintColor: focused ? 'blue' : null}}
                />
              </View>
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="Store"
        component={StoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={require('../assets/store.png')}
                  resizeMode="contain"
                  style={{width: 25, tintColor: focused ? 'blue' : null}}
                />
              </View>
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={require('../assets/outLinedBookmark.png')}
                  resizeMode="contain"
                  style={{width: 25, tintColor: focused ? 'blue' : null}}
                />
              </View>
            );
          },
        }}
      />
      <TabNavigator.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <Image
                  source={require('../assets/more.png')}
                  resizeMode="contain"
                  style={{width: 25, tintColor: focused ? 'blue' : null}}
                />
              </View>
            );
          },
        }}
      />
    </TabNavigator.Navigator>
  );
};

export default Tabs;
