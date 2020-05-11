import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import PostItem from './PostItem'
import baseStyles from '../../styles/common/baseStyles'

interface IPostListProps {
  posts: any;
  navigate: (screenName: string, data: any) => void;
}


export default (props: IPostListProps) => {
  const handlePostPress = (post: any) => {
    props.navigate("PostDetail", {post})
  }

  const postsToBeRendered = () => {
    if (props.posts.length > 0) {
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

 return (
  <ScrollView style={baseStyles.containerWidthBottomTabBar}>
    { postsToBeRendered() }
  </ScrollView>
 )
}