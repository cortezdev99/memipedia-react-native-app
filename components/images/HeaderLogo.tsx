import React from 'react';
import {Image} from 'react-native'

const imgPath = "../../assets/memipedia-logo.png"

export default () => {
  return <Image source={require(imgPath)} style={{ height: 30, width: 29}} />
}