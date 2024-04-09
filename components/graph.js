import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";



const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const graph = (props) => {
  
  const data = {
    labels: props.x,
    datasets: [
      {
        data: props.y,
        color: (opacity = 1) => `rgba(0, 128, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [props.parameter], // optional
  };

  return (
    <View style={styles.container}>
      
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  
});

export default graph;
