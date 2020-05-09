import React, { useState, useEffect } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'
import * as SecureStore from 'expo-secure-store'

import api from '../utils/api';

interface ICurrentUserProviderProps {
  children: any;
}

export default (props: ICurrentUserProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null)

  const getUser = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");

    api.get("logged_in", {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    }).then(resp => {
      console.log("response from getUser", resp.data)
      if (resp.data.memipedia_user) {
        setCurrentUser(resp.data.memipedia_user);
      } else {
        setCurrentUser(null);
      }
    }).catch(err => {
      setCurrentUser(null);
    })
  }

  const stateValues = {
    currentUser,
    setCurrentUser,
    getUser
  }
  return (
    <CurrentUserContext.Provider value={stateValues}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}