import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BASE_URL} from '../../constants/APIClient';
import axios from 'axios';
import AppContext from '../../useContext/AppContext';
import ShowPosts from '../../components/showPosts';
import {useIsFocused} from '@react-navigation/core';
import ModalView from '../../components/modal';
import {showToast} from '../../utils/LocalStorage';
import {getMethod} from '../../utils/LocalStorage';

const BookmarksScreen = () => {
  const {userToken, setGetPost} = useContext(AppContext);
  const [bookmarks, setBookmarks] = useState({});
  const [bookmarksData, setBookmarksData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserbookmarks();
    }
  }, [isFocused]);

  const getUserbookmarks = async () => {
    setIsModalVisible(true);
    const response = await getMethod({
      endUrl: 'posts/bookmarked',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.status === 200) {
      setIsModalVisible(false);
      setBookmarks(response.data);
    } else {
      if (response?.response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  useEffect(() => {
    if (Object.keys(bookmarks).length > 0) {
      setBookmarksData(bookmarks);
    }
  }, [bookmarks]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ModalView visible={isModalVisible} />
        <View style={styles.bookmarksTitleView}>
          <Text style={styles.bookmarksTitle}>Bookmarks</Text>
        </View>
        {bookmarksData.length === 0 || bookmarksData['posts'].length === 0 ? (
          <View style={styles.bookmarksEmptyView}>
            <Image source={require('../../assets/info.png')} />
            <Text style={{...styles.text, color: 'black'}}>No bookmarks</Text>
            <Text style={styles.text}>Nothing to see here.</Text>
          </View>
        ) : (
          <View style={styles.bookmarksView}>
            <FlatList
              data={bookmarksData.posts}
              renderItem={({item}) => (
                <ShowPosts
                  item={item}
                  setIsModalVisible={setIsModalVisible}
                  setGetPost={setGetPost}
                  getUserbookmarks={getUserbookmarks}
                />
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bookmarksTitleView: {
    flex: 0.1,
    justifyContent: 'center',
  },
  bookmarksTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    paddingLeft: 20,
  },
  text: {
    color: 'grey',
    fontSize: 18,
    paddingTop: 10,
  },
  bookmarksEmptyView: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarksView: {
    flex: 0.9,
  },
});

export default BookmarksScreen;
