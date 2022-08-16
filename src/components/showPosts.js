import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import AppContext from '../useContext/AppContext';
import {putMethod} from '../utils/LocalStorage';
import {getAllPosts} from '../utils/LocalStorage';
import {showToast} from '../utils/LocalStorage';

const ShowPosts = ({item, setIsModalVisible, setGetPost, getUserbookmarks}) => {
  const {userToken} = useContext(AppContext);

  const addToBookmarks = async () => {
    const response = await putMethod({
      endUrl: `posts/${item['id']}/toggle-bookmark`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    await getAllPosts(setIsModalVisible, setGetPost, userToken);
    if (getUserbookmarks) {
      getUserbookmarks();
    }

    if (response?.status !== 204) {
      if (response?.status === 500) {
        showToast('Internal server error');
      } else {
        showToast('Network error');
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageView}>
            <Image
              style={styles.avatar}
              source={require('../assets/image_icon.png')}
            />
          </View>

          <View style={{flex: 0.8}}>
            <Text style={styles.nameText}>
              {item['user']['first_name']} {item['user']['last_name']}
            </Text>
            <Text style={styles.timeAgoText}>
              Posted {moment(item['created_at']).fromNow()}
            </Text>
            <Text style={styles.text}>{item['text']}</Text>
          </View>

          <View style={{flex: 0.1}}>
            <TouchableOpacity
              onPress={() => {
                addToBookmarks();
              }}>
              <Image
                style={styles.bookmarksLogo}
                source={
                  item.bookmarked_at === null
                    ? require('../assets/outLinedBookmark.png')
                    : require('../assets/filledBookmark.png')
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  container: {
    elevation: 2,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  imageView: {
    flex: 0.1,
    marginRight: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  nameText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    paddingBottom: 5,
  },
  timeAgoText: {
    fontSize: 14,
    paddingBottom: 5,
    color: 'lightGrey',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  bookmarksLogo: {
    height: 30,
    width: 20,
  },
});

export default ShowPosts;
