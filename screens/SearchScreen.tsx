import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import Container from '../components/layouts/Container'

interface ISearchScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

const SearchScreen = (props: ISearchScreenProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (query: any) => {
    console.log("Searching for", query)
  }

  const searchBar = (
    <View>
      <TextInput
        value={query}
        onChangeText={val => setQuery(val)}
        placeholderTextColor="white"
        placeholder="Search"
        onSubmitEditing={() => handleSearch(query)}
      />

      <TouchableOpacity onPress={() => handleSearch(query)}>
        <Text style={{ color: "white" }}>Search</Text>
      </TouchableOpacity>
    </View>
  )
  return (
    <Container navigate={props.navigation.navigate}>
      <Text>Search Screen</Text>
      {searchBar}
    </Container>
  )
}

export default SearchScreen;