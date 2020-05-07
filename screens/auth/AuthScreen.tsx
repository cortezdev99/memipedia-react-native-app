import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { dark } from '../../styles/colors';

export default () => {
  const [formToShow, setFormToShow] = useState("LOGIN");
  const [email, setEmeail] = useState("");

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

  const handleHeaderText = () => {
    if (formToShow === "LOGIN") {
      return "Login"
    } else if (formToShow === "REGISTER") {
      return "Register"
    }
  }

  return (
    <View style={{ marginTop: 100, backgroundColor: dark, height: "100%" }}>
      <Text style={{ color: "white" }}>{handleHeaderText()}</Text>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={(val) => setEmeail(val)}
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            height: 40,
            paddingLeft: 20,
          }}
          autoCapitalize="none"
          spellCheck={false}
        />
      </View>

      <TouchableOpacity onPress={handleAuthTypePress}>
        <Text style={{ color: "white" }}>{screenTypeText()}</Text>
      </TouchableOpacity>
    </View>
  )
}