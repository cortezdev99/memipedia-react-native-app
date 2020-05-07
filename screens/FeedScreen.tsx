import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Container from '../components/layouts/Container'

interface IFeedScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

const FeedScreen = (props: IFeedScreenProps) => {
  return (
    <Container>
      <Text>Feed Screen</Text>

      <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
        <Text>Search</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default FeedScreen;