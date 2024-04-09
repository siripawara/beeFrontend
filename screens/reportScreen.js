import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, View, Pressable, StyleSheet } from "react-native";
import Graph from "../components/graph";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
const reportScreen = () => {
  const [X, setX] = useState([
    "0",
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
  ]);
  const [Y, setY] = useState([30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]);
  const [modalVisible, setModalVisible] = useState(false);
  const [parameter, setParameter] = useState("Temperature");
  const [range, setRange] = useState("24h");
  const dateConvert = (date) => {
    let ts = (date.date.seconds + date.date.nanoseconds / 1000000000) * 1000;
    return new Date(ts);
  };
  const fetchData = async () => {
    try {
      console.log("fetchdata run....!");
      const response = await axios.get(
        "https://bee-backend.onrender.com/data2"
      );
      console.log(response.data);
      console.log(parameter);
      let temparyTemp = [];
      parameter == "Temperature"
        ? response.data.map((data) => temparyTemp.push(parseInt(data.temp)))
        : parameter == "Humidity"
        ? response.data.map((data) => temparyTemp.push(data.humidity))
        : response.data.map((data) =>
            temparyTemp.push(parseFloat(data.weight))
          );
      console.log(temparyTemp);
      let temparyDate = [];
      response.data.map((data) =>
        temparyDate.push(dateConvert(data).getHours())
      );
      console.log(temparyDate);
      setY(temparyTemp);
      setX(temparyDate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [parameter]);
  const refresh = () => {
    fetchData();
  };
  return (
    <View style={styles.filterContainer}>
      <Graph parameter={parameter} x={X} y={Y}></Graph>
      <Pressable
        style={styles.filterPressableContainer}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.filterBtn}>
          <Text style={[styles.filterBtnText]}>Filters</Text>
        </View>
      </Pressable>
      <View style={styles.footer}>
        <Pressable onPress={refresh}>
          <Ionicons name="refresh-circle" size={46} color="gray" />
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.parameterMenu}>
              <Pressable onPress={() => setParameter("Temperature")}>
                <View
                  style={[
                    styles.topMenuOption,
                    parameter == "Temperature"
                      ? styles.topMenuOptionToggle
                      : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuOptionText,
                      parameter == "Temperature"
                        ? styles.topMenuOptionTextToggle
                        : "",
                    ]}
                  >
                    Temp
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setParameter("Humidity")}>
                <View
                  style={[
                    styles.topMenuOption,
                    parameter == "Humidity" ? styles.topMenuOptionToggle : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuOptionText,
                      parameter == "Humidity"
                        ? styles.topMenuOptionTextToggle
                        : "",
                    ]}
                  >
                    Humidity
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setParameter("Weight")}>
                <View
                  style={[
                    styles.topMenuOption,
                    parameter == "Weight" ? styles.topMenuOptionToggle : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuOptionText,
                      parameter == "Weight"
                        ? styles.topMenuOptionTextToggle
                        : "",
                    ]}
                  >
                    Weight
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.parameterMenu}>
              <Pressable onPress={() => setRange("24h")}>
                <View
                  style={[
                    styles.topMenuOption,
                    range == "24h" ? styles.topMenuOptionToggle : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuOptionText,
                      range == "24h" ? styles.topMenuOptionTextToggle : "",
                    ]}
                  >
                    Last 24H
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setRange("7d")}>
                <View
                  style={[
                    styles.topMenuOption,
                    range == "7d" ? styles.topMenuOptionToggle : "",
                  ]}
                >
                  <Text
                    style={[
                      styles.topMenuOptionText,
                      range == "7d" ? styles.topMenuOptionTextToggle : "",
                    ]}
                  >
                    Last 7days
                  </Text>
                </View>
              </Pressable>
            </View>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Ionicons name="close-circle" size={36} color="grey" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterBtn: {
    borderWidth: 2,
    borderColor: "grey",
    paddingHorizontal: 7,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingBottom: 5,
    paddingTop: 3,
    flex: 1,
    alignItems: "center",
    float: "right",
    width: 150,
  },
  filterBtnText: {
    fontSize: 16,
    fontWeight: 600,
  },
  filterContainer: {
    width: "100%",
    paddingTop: 40,
  },
  filterPressableContainer: {
    alignItems: "center",
    marginHorizontal: "auto",
    paddingTop: 25,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  parameterMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 8,
    marginBottom: 20,
  },
  topMenuOption: {
    borderWidth: 2,
    borderColor: "grey",
    paddingHorizontal: 7,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingBottom: 5,
    paddingTop: 3,
    marginHorizontal: 3,
  },
  topMenuOptionText: {
    fontSize: 16,
    fontWeight: 600,
  },
  topMenuOptionToggle: {
    backgroundColor: "#0080ff",
    borderColor: "#0080ff",
  },
  topMenuOptionTextToggle: {
    color: "white",
  },
});
export default reportScreen;
