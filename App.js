import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,SafeAreaView,Pressable,ScrollView ,ActivityIndicator } from 'react-native';
import TempHumScreen from './screens/tempHumScreen';
import WeightScreen from './screens/weightScreen';
import ReportScreen from './screens/reportScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const dateConvert =(date)=>{
  let ts = (date.date.seconds+date.date.nanoseconds/1000000000)*1000
  return new Date(ts)
}
export default function App() {
  const [select,setSelect] = useState("temp");
  const [data,setData] = useState({"temp": "","humidity": "","weight": "","date":""});
  const [dateTime,setDateTime] = useState(new Date("2024-01-01 00:00"));
 
  const fetchData = async() =>{
    try {
      console.log("fetchdata run....!")
      const response = await axios.get("https://bee-backend.onrender.com/live")
      console.log(response.data)
      setData(response.data)
      setDateTime(dateConvert(response.data))
      
    } catch (error) {
      console.log(error)
    }
  }
  const refresh = () =>{
    console.log(data)
    fetchData()
    console.log(dateTime)

  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <ScrollView>
    <SafeAreaView style={{width:'100%',paddingTop:45,height:'100%'}}>
      
    <Text style={styles.title}>BEEHIVE 01</Text>
    
    <View style={styles.topMenu}>
      <Pressable onPress={()=>setSelect("temp")}><View style={[styles.topMenuOption,select=="temp"?styles.topMenuOptionToggleTemp:""]}><Text style={[styles.topMenuOptionText,select=="temp"?styles.topMenuOptionTextToggle:""]}>Temp/Hum</Text></View></Pressable>
      <Pressable onPress={()=>setSelect("weight")}><View style={[styles.topMenuOption,select=="weight"?styles.topMenuOptionToggleWeight:""]}><Text style={[styles.topMenuOptionText,select=="weight"?styles.topMenuOptionTextToggle:""]}>Weight</Text></View></Pressable>
      <Pressable onPress={()=>setSelect("report")}><View style={[styles.topMenuOption,select=="report"?styles.topMenuOptionToggleReport:""]}><Text style={[styles.topMenuOptionText,select=="report"?styles.topMenuOptionTextToggle:""]}>Reports</Text></View></Pressable>
    </View>
    
    <View style={styles.side}>
      <Text style={styles.sideText}>{data.date?`${dateTime.toLocaleDateString()}`:<ActivityIndicator/>}</Text>
      <Text style={styles.sideText}>{data.date?`${dateTime.toLocaleTimeString()}`:<ActivityIndicator/>}</Text>
    </View>
    
      {
        select=="temp"?<TempHumScreen data={data}/>: select=="weight"?<WeightScreen data={data}/>: select=="report"?<ReportScreen/>:<Text>error</Text>
      }
    
    {
        select =="temp" || select=="weight"?
        <View style={styles.footer}>
        <Pressable onPress={refresh}>
        <Ionicons name="refresh-circle" size={46} color="grey" />
        </Pressable>
      </View>
      :<></>
    }
  
      
    </SafeAreaView>
    </ScrollView>
    
  );
}
{/* <StatusBar style="auto" /> */}
const styles = StyleSheet.create({
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:'grey',
    fontFamily:'',
    textAlign:'center',
    marginBottom:20,
    marginTop:10
  },
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
  },
  side:{
    backgroundColor:'grey',
    color:'white',
    width:'40%',
    padding:10,
    borderTopEndRadius:10,
    borderBottomEndRadius:10,
  },
  sideText:{
    color:'white',
    fontSize:18,
  },
  topMenu:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-around",
    paddingHorizontal:20,
    marginVertical:8,
    marginBottom:20
  },
  topMenuOption:{
    borderWidth:2,
    borderColor:'grey',
    paddingHorizontal:7,
    borderRadius:100,
    paddingHorizontal:18,
    paddingBottom:5,
    paddingTop:3,
    
  },
  topMenuOptionText:{
    fontSize:16,
    fontWeight:600,
  },
  topMenuOptionToggleTemp:{
    backgroundColor:'#ffbf00',
    borderColor:'#ffbf00',
  },
  topMenuOptionToggleReport:{
    backgroundColor:'#0080ff',
    borderColor:'#0080ff',
  },
  topMenuOptionToggleWeight:{
    backgroundColor:'#ba8747',
    borderColor:'#ba8747',
  },
  topMenuOptionTextToggle:{
    color:'white'
  },
  footer:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:25,
  },
  
});
