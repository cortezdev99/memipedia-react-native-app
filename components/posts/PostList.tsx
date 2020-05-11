import React from 'react'
import { ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'

import PostItem from './PostItem'
import baseStyles from '../../styles/common/baseStyles'

interface IPostListProps {
  posts: any;
  navigate: (screenName: string, data: any) => void;
  getPosts?: () => void;
  isLoading: boolean;
}


export default (props: IPostListProps) => {
  const handlePostPress = (post: any) => {
    props.navigate("PostDetail", {post})
  }

  const postsToBeRendered = () => {
    if (props.isLoading && props.posts.length === 0) {
      return <ActivityIndicator color="white" size="large"/>
    } else if (props.posts.length > 0) {
      return props.posts.map((post: any) => {
        const { id } = post
        return (
          <TouchableOpacity key={id} onPress={() => handlePostPress(post)}>
            <PostItem post={post} />
          </TouchableOpacity>
        )
      })
    } else {
      return null
    }
  }

  const handleRefresh = () => {
    if (props.getPosts) {
      props.getPosts()
    }
  }

 return (
  <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={props.isLoading}
        onRefresh={handleRefresh}
        colors={["white"]}
        tintColor="white"
      />
    }
    style={baseStyles.containerWidthBottomTabBar}
  >
    { postsToBeRendered() }
  </ScrollView>
 )
}