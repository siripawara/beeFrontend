import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import TempCircle from '../components/tempCircle'
import HumidityCircle from '../components/HumidityCircle';

const TempHum = props => {
  return (
    <View style={styles.container}>
      <TempCircle data={props.data.temp}/>
      <HumidityCircle data={props.data.humidity}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        margin:0
      },
  });

export default TempHum