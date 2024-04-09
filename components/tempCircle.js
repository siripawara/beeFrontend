import React from "react";
import { View, Text, StyleSheet,ActivityIndicator } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
const tempCircle = (props) => {
  return (
    <View style={styles.tempContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.value}>{props.data?props.data:<ActivityIndicator/>}</Text>
        <Text style={styles.symbol}>°C</Text>
      </View>
      <Text style={styles.name}>Temperature</Text>
      <Ionicons name="thermometer-outline" size={26} color="#ffbf00" />
    </View>
  );
};

const styles = StyleSheet.create({
  tempContainer: {
    borderWidth: 10,
    borderColor: "#ffbf00",
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 220,
    borderRadius: 1000,
    marginTop:10
  },
  value: {
    fontSize: 55,
    margin: 0,
    padding: 0,
    fontWeight: "600",
    color:'grey',

  },
  symbol: {
    margin: 0,
    padding: 0,
    color:'grey',
    fontSize:20
  },
  name: {
    fontSize: 18,
    color:'grey'

  },
});

export default tempCircle;
