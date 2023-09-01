import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useState } from 'react'
import openweather from '../api/openweather'
import { useEffect } from 'react'
import IconImg from '../components/IconImg'
import { ActivityIndicator } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const WeatherScreen = ({route}) => {
 
   const {city} = route.params;
   const [data,setData] = useState('');
   const [n,setN] = useState('');

   const getWeatherDataByCity = async() =>{
    try{
       const response = await openweather.get('weather',{
        params:{
          q: city,
          units: 'metric',
          appid : '83e89dc8afdb42be5a1cced78a223452'
        }
      })
      setData(response.data);
      console.log(response.data);
      setN('ok');
    }catch(err){
      console.log(err);
    }
  }


  useEffect(()=>{
    getWeatherDataByCity();
  },[n])

  return (
    <View style={styles.container}>
    {data ?
    <View>
    <Text style={styles.text}>{data.name.toUpperCase()}({data.sys.country})</Text>
    <IconImg style={styles.icon} main={data.weather[0].main} size={180}/>
    <Text style={styles.text}>{data.weather[0].description}</Text>
    <View style={styles.sub_temps}>
    <Text>
    Temp : <FontAwesome5 name="temperature-high" size={15} color="black" /> {data.main.temp} C
    </Text>
    <Text>Humidity : <Entypo name="drop" size={15} color="black" /> {data.main.humidity}  g/m</Text>
    <Text>Pressure:  <Ionicons name="speedometer" size={15} color="black" /> {data.main.pressure} (Pa) </Text>
    <Text>Wind : <FontAwesome5 name="wind" size={15} color="black" /> {data.wind.speed}(m/s)</Text>
    <Text>Date recorded: {new Date(data.dt * 1000).toLocaleDateString("default")}</Text>
    </View>
    </View>
    :
     <ActivityIndicator color='#ea6d4a' size={100}/>}


  </View>
  )
}

export default WeatherScreen

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:30
      },
      text:{
       fontSize:25,
       fontWeight: '600',
       textAlign: 'center',
       marginVertical:10
      },
      icon:{
       alignItems: 'center'
      },
      sub_temps:{
       backgroundColor: '#e2e3e5',
       padding:10
      }
})