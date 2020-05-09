import React from 'react'
import { View, Text } from 'react-native'

import PostImagePicker from '../components/posts/PostImagePicker'

const PostFormScreen = () => {
  return (
    <View style={{ height: "100%" }}>
      <Text>Post Form Screen</Text>

      <View style={{ marginTop: 40, height: 100 }}>
        <PostImagePicker />
      </View>
    </View>
  )
}

export default PostFormScreen;