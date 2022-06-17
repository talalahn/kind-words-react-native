import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../../styles/constants';
import { loadPosts } from '../../utils/store';
import Header from '../Header';
import PostList from '../PostItem';

const renderItem = (item) => <PostList post={item.item} />;

export default ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useFocusEffect(() => {
    loadPosts().then((loadedPosts) => {
      if (loadedPosts) {
        setPosts(loadedPosts);
      }
    });
  });

  const onNewPost = async (newPost) => {
    await addPost(newPost);
    const loadedPosts = await loadPosts();
    setPosts(loadedPosts);
  };

  // const [posts, setPosts] = useState([
  //   {
  //     sender: 'Ramon',
  //     handle: 'hola_soy_milk',
  //     body: "You're awesome!",
  //     createdAt: new Date(),
  //   },
  //   {
  //     sender: 'Pearl',
  //     handle: 'punk_rock_swords',
  //     body: 'Affluent!',
  //     createdAt: new Date(),
  //   },
  //   {
  //     sender: 'Garnet',
  //     handle: 'stronger_than_u',
  //     body: 'An experience!',
  //     createdAt: new Date(),
  //   },
  // ]);
  // const onNewPost = (newPost) => {
  //   setPosts([...posts, newPost]);
  // };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <Header label="Kind Words" />
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.body}
      />
      <Button
        title="New Post"
        onPress={() => navigation.push('NewPost', { onNewPost })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    height: '100%',
    backgroundColor: colors.background,
  },
});
