
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const FeedScreen = (props) => {
  return (
    <View>
      <Text>Feed Screen</Text>

      <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FeedScreen;