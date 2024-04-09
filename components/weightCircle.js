import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const weightCircle = (props) => {
  return (
    <View style={styles.tempContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.value}>{props.data}</Text>
        <Text style={styles.symbol}>Kg</Text>
      </View>
      <Text style={styles.name}>Weight</Text>
      <Ionicons name="barbell-outline" size={26} color="#ba8747" />
    </View>
  );
};

const styles = StyleSheet.create({
  tempContainer: {
    borderWidth: 10,
    borderColor: "#ba8747",
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 220,
    borderRadius: 1000,
    marginTop:30
  },
  value: {
    fontSize: 45,
    margin: 0,
    padding: 0,
    fontWeight: "600",
    color:'grey'

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

export default weightCircle;
