import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import Container from '../components/layouts/Container'
import api from '../utils/api';
import PostItem from '../components/posts/PostItem'
import baseStyles from '../styles/common/baseStyles';

interface IFeedScreenProps {
  navigation: {
    navigate: (screenName: string, data?: any) => void;
  }
}

const FeedScreen = (props: IFeedScreenProps) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");

    api.get("memipedia_posts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      setPosts(resp.data.memipedia_posts)
      setIsLoading(false)
    }).catch(err => {
      console.log("err from posts", err)
      setIsLoading(false)
    })
  }

  const handlePostPress = (post: any) => {
    props.navigation.navigate("PostDetail", {post})
  }

  return (
    <Container navigate={props.navigation.navigate}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView style={baseStyles.containerWidthBottomTabBar}>
            {posts.map((post) => {
              const { id } = post
              return (
                <TouchableOpacity key={id} onPress={() => handlePostPress(post)}>
                  <PostItem post={post} />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </View>
    </Container>
  )
}

export default FeedScreen;