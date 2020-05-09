import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import Container from '../components/layouts/Container'
import api from '../utils/api';
import PostItem from '../components/posts/PostItem'

interface IFeedScreenProps {
  navigation: {
    navigate: (arg: string) => void;
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

  return (
    <Container navigate={props.navigation.navigate}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            {posts.map((post) => {
              const { id } = post
              return (
                <PostItem key={id} post={post} />
              )
            })}
          </ScrollView>
        )}
      </View>
    </Container>
  )
}

export default FeedScreen;