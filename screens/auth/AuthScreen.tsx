import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import textInputStyles from "../../styles/forms/textInputStyles"
const { textFieldWrapper, textField } = textInputStyles;
import authScreenStyles from '../../styles/stacks/auth/authScreenStyles'
import API from "../../utils/api"
import Button from '../../components/helpers/Button'
import { formatErrors } from '../../utils/textFormatters'
import CurrentUserContext from '../../contexts/CurrentUserContext';

interface IAuthScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  }
}

export default (props: IAuthScreenProps) => {
  const [formToShow, setFormToShow] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { getUser } = useContext(CurrentUserContext)

  const screenTypeText = () => {
    if (formToShow === "LOGIN") {
      return "Need an account? Register";
    } else if (formToShow === "REGISTER") {
      return "Already have an account? Login"
    }
  }

  const handleAuthTypePress = () => {
    if (formToShow === "LOGIN") {
      setFormToShow("REGISTER")
    } else if (formToShow === "REGISTER") {
      setFormToShow("LOGIN")
    }
  }

  const handleButtonText = () => {
    if (formToShow === "LOGIN") {
      return "Login"
    } else if (formToShow === "REGISTER") {
      return "Register"
    }
  }

  const handleLogin = () => {
    const params = {
      auth: {
        email: email,
        password: password
      }
    }
    API.post("memipedia_user_token", params).then(async resp => {
      if (resp.data.jwt) {
        await SecureStore.setItemAsync("memipedia_secure_token", resp.data.jwt)
        getUser()
        setIsSubmitting(false)
        props.navigation.navigate("Feed")
      } else {
        alert("It looks like you typed in the wrong email or password, please try again")
        setIsSubmitting(false)
      }
    }).catch(err => {
        setIsSubmitting(false)
        alert("It looks like you typed in the wrong email or password, please try again")
    })
  }

  const handleRegistration = () => {
    const params = {
      user: {
        email: email,
        password: password
      }
    }
    API.post("memipedia_users", params).then((resp) => {
      if (resp.data.memipedia_user) {
        handleLogin();
      } else {
        setIsSubmitting(false)
        alert(`Error creating user account: ${formatErrors(resp.data.errors)}`)
      }

    }).catch(err => {
        setIsSubmitting(false)
        alert("Error creating user account")
    })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    if (formToShow == "LOGIN") {
      handleLogin()
    } else {
      handleRegistration()
    }
  }

  return (
    <ScrollView style={authScreenStyles.container}>
      <View style={textFieldWrapper}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={textField}
          autoCapitalize="none"
          spellCheck={false}
        />
      </View>

      <View style={textFieldWrapper}>
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={textField}
          autoCapitalize="none"
          spellCheck={false}
          secureTextEntry={true}
          onSubmitEditing={handleSubmit}
        />
      </View>

      <TouchableOpacity onPress={handleAuthTypePress} style={{marginTop: 10, marginBottom: 20 }}>
        <Text style={{ color: "white" }}>{screenTypeText()}</Text>
      </TouchableOpacity>

      {
        isSubmitting ? (
          <Button text={"Submitting..."} onPress={handleSubmit} disabled={true}/>
        ) : (
          <Button text={handleButtonText()} onPress={handleSubmit} />
        )
      }
    </ScrollView>
  )
}