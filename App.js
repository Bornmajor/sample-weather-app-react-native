import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './components/StackNav';
import { createContext } from 'react';
import * as Location from 'expo-location';
import openweather from './api/openweather';
import { useState,useEffect } from 'react';


export const WeatherContext = createContext();

export default function App() {
  const [location, setLocation] = useState('');
  const [lat,setLat] = useState('');
  const [long,setLong] = useState('');
  const [n,setN] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(()=>{
   getCurrentLocationData();     
     
  },[n])
  
   
  const getCurrentLocationData = async() =>{

  let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await Location.enableNetworkProviderAsync();
      setLocation(location);
      setN('ok');
         const entries = Object.entries(location.coords);
         let data = entries.map( ([key, val] = entry) => {
          return val;
       
        });
         console.log(location);
         console.log(data[3]);
         console.log(data[2]);

        setLong(data[3])
        setLat(data[2]);
         
  }


 
  return (
    <WeatherContext.Provider value={{long,lat}}>
        <StackNav />
      </WeatherContext.Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
