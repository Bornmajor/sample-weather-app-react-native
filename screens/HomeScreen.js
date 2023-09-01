import { StyleSheet, Text, View,Pressable,FlatList,Image ,ActivityIndicator,ScrollView} from 'react-native'
import React, { useEffect ,useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { WeatherContext } from '../App';
import openweather from '../api/openweather';
import IconImg from '../components/IconImg';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo'

const HomeScreen = () => {
    const [net,setNetwork] = useState('');
    const {long,lat} = useContext(WeatherContext);
    const navigation = useNavigation();
    const [data,setData] = useState(null);
    const [listForecast,setListForecast] = useState(null);

    useEffect(()=>{
         const unsubscribe = NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        if(state.isConnected == false){
          setNetwork('No internet');
         }
      });

        navigation.setOptions({
         headerRight:()=>(
          <View style={{padding:10}}>
             <Pressable onPress={()=> navigation.navigate('Search')}>
               <MaterialCommunityIcons name="cloud-search" size={30} color="black" /> 
             </Pressable>
              
          </View>
         )
        })
        checkNetworkConnection();
        getCurrentWeather();
       getWeatherDayHourForecast();
           // Unsubscribe
    return () => {
      unsubscribe();
    };  
      },[lat],[long],[data])

   
      

      const checkNetworkConnection = () =>{
        NetInfo.fetch().then(state => {
          // console.log('Connection type', state.type);
          // console.log('Is connected?', state.isConnected); 
          if(state.isConnected == false){
           setNetwork('No internet');
          }
        });
      }

      const getCurrentWeather = async() =>{
        try{
           const response = await openweather.get('weather',{
          params:{
            lat : lat,
            lon: long,
            units: 'metric',
            appid : '83e89dc8afdb42be5a1cced78a223452'
          }
        });  
     
        setData(response.data);
        console.log(response.data); 
        //name
        }
        catch(err){
          console.log(err);
        }  
      }

      const getWeatherDayHourForecast = async() =>{
        try{
         const response = await openweather.get('forecast',{
             params:{
              lat : lat,
              lon: long,
              units: 'metric',
               appid : '83e89dc8afdb42be5a1cced78a223452'
             }
           })
           setListForecast(response.data.list);
           console.log(response.data.list);
      
     
        }catch(err){
         console.log(err);
        }
       }
     
       function getFirstStringDay(value){
       let val =  value.split(' ');
       return val[0];
        
       }
       function getSecondStringTime(value){
        let val =  value.split(' ');
        return val[1];
       }
      


    
      
  return (
    <View style={styles.container}>
      {net ? 
      <View style={styles.netstat}>
      <Text style={{fontSize:20}}> <FontAwesome name="warning" size={24} color="black" /> {net}</Text>
      </View>
      : null}
      {data ?

      <>
      <Text style={styles.text}>{data.name.toUpperCase()}({data.sys.country})</Text>
      <IconImg style={styles.icon} main={data.weather[0].main} size={150}/>
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
 
   <Text style={{fontSize:20,fontWeight:'600',textAlign:'center'}}>Every day / 3 hour forecast for {data.name}</Text>
      <FlatList
   
       horizontal
       showsHorizontalScrollIndicator={false}
      data={listForecast}
      keyExtractor={item => item.dt_txt}
      renderItem={({item}) =>{
        return(
          <Pressable style={styles.item}>
          <IconImg style={styles.icon} main={item.weather[0].main} size={80}/>
          <Text>{getFirstStringDay(item.dt_txt)}</Text>
          <Text>{getSecondStringTime(item.dt_txt)}</Text>
         </Pressable>
        )
       
      }}

      />


      </>

      :
       <ActivityIndicator color='#ea6d4a' size={100}/>}
    
  
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  netstat:{
   backgroundColor: '#e2e3e5',
   padding:10,
   width:'100%',
   alignItems:'center',
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    // margin:10
  },
  text:{
   fontSize:25,
   fontWeight: '600',
   textAlign: 'center',
   marginVertical:10
  },
  icon:{
   alignItems: 'center',
   justifyContent: 'center'
  },
  sub_temps:{
   backgroundColor: '#e2e3e5',
   padding:10
  },
  item:{
    alignItems: 'center',
    backgroundColor:'#e2e3e5',
    padding:10,
    borderRadius: 8,
    margin:10

  }
})