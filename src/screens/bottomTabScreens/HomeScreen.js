import React, {useState, useEffect, useContext} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/button';
import CreatePosts from '../../components/createPosts';
import AppContext from '../../useContext/AppContext';
import ShowPosts from '../../components/showPosts';
import ModalView from '../../components/modal';
import {getAllPosts} from '../../utils/LocalStorage';

const HomeScreen = () => {
  const {userToken, getPost, setGetPost} = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getAllPosts(setIsModalVisible, setGetPost, userToken);
  }, []);
  useEffect(() => {
    if (Object.keys(getPost).length > 0) {
      setData(getPost);
    }
  }, [getPost]);

  const handleModal = modal => {
    setModal(modal);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ModalView visible={isModalVisible} />
        <CreatePosts
          visible={modal}
          handleModal={handleModal}
          getAllPosts={getAllPosts}
        />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Posts</Text>
          <Button
            onPress={() => {
              setModal(true);
            }}
            style={{marginTop: 0}}
            textColor={'white'}
            text={'Add Post'}
          />
        </View>
        <View style={{flex: 0.9}}>
          <FlatList
            data={data.posts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ShowPosts
                item={item}
                setIsModalVisible={setIsModalVisible}
                setGetPost={setGetPost}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
});

export default HomeScreen;
