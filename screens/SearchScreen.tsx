import React from 'react';
import { Text, View } from 'react-native';

import Container from '../components/layouts/Container'

interface ISearchScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

const SearchScreen = (props: ISearchScreenProps) => {
  return (
    <Container navigate={props.navigation.navigate}>
      <Text>Search Screen</Text>
    </Container>
  )
}

export default SearchScreen;