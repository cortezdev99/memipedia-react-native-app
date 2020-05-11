import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../components/layouts/Container'
import api from '../utils/api';
import PostList from '../components/posts/PostList';
import searchScreenStyles from '../styles/stacks/search/searchScreenStyles';

interface ISearchScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

const SearchScreen = (props: ISearchScreenProps) => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false)

  const handleSearch = async (query: any) => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");
    setIsLoading(true)
    setEmptyQuery(false)

    const params = {
      query
    }

    const headers = {
      Authorization: `Bearer ${token}`
    }

    api.get("memipedia_queries", {
      params,
      headers
    }).then((resp) => { 
      if (resp.data.memipedia_posts.length === 0) {
        setEmptyQuery(true)
      }
      
      setPosts(resp.data.memipedia_posts)
      setIsLoading(false)

    }).catch((err) => {
      setIsLoading(false)
      alert("Error fetching data")
    })
  }

  const {
    searchFormContainer,
    searchTextInput,
    searchIcon
  } = searchScreenStyles

  const searchBar = (
    <View style={searchFormContainer}>
      <TextInput
        value={query}
        onChangeText={val => setQuery(val)}
        placeholder="Search"
        onSubmitEditing={() => handleSearch(query)}
        style={searchTextInput}
      />

      <TouchableOpacity style={searchIcon} onPress={() => handleSearch(query)}>
        <Ionicons name="md-search" color="white" size={30} />
      </TouchableOpacity>
    </View>
  )

  const queryToBeRendered = () => {
    if (isLoading) {
      return <ActivityIndicator />
    } else if (emptyQuery) {
      return (
        <View style={{ paddingRight: 15, paddingLeft: 15 }}>
          <Text style={{ color: "white" }}>Sorry, no posts match your search...</Text>
        </View>
      )
    } else if (posts && posts.length > 0) {
      return <PostList posts={posts} navigate={props.navigation.navigate}/>
    } else {
      return null
    }
  }
  return (
    <Container navigate={props.navigation.navigate}>
      {searchBar}
      { queryToBeRendered() }
    </Container>
  )
}

export default SearchScreen;