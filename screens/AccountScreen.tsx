import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import CurrentUserContext from '../contexts/CurrentUserContext'
import Button from '../components/helpers/Button';


interface IAccountScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

const AccountScreen = (props: IAccountScreenProps) => {
  const { setCurrentUser } = useContext(CurrentUserContext)

  const handleSignOut = async () => {
    await SecureStore.deleteItemAsync("memipedia_secure_token")
    setCurrentUser(null);
    props.navigation.navigate("Auth")
  }

  return (
    <View>
      <Text>Account Screen</Text>

      <View style={{ marginTop: 20 }}>
        <Button onPress={handleSignOut} text="Sign Out" />
      </View>
    </View>
  )
}

export default AccountScreen