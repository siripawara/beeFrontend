import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import WeightCircle from '../components/weightCircle'


const weightScreen = (props) => {
  return (
    <View style={styles.container}>
      <WeightCircle data={props.data.weight}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{

        width:'100%',
        alignItems:'center',
      },
  });

export default weightScreen