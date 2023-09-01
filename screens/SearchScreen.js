import { StyleSheet, Text, View,TextInput } from 'react-native'
import React, { useEffect,useState } from 'react'
import openweather from '../api/openweather'
import { useNavigation } from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import IconImg from '../components/IconImg';
import { Pressable } from 'react-native';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [data,setData] = useState('');
    const [error,setError] = useState('');

    const onChangeSearch = query => {
      setSearchQuery(query)
      getWeatherDataByCity();
    };

    const getWeatherDataByCity = async() =>{
      try{
         const response = await openweather.get('weather',{
          params:{
            q: searchQuery,
            appid : '83e89dc8afdb42be5a1cced78a223452'
          }
        })
        setData(response.data);
        console.log(response.data)
      }catch(err){
        console.log(err);
      }
    }
  
  return (
    <View>
       <Searchbar 
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditiong={onChangeSearch}
       value={searchQuery}
       mode='view'
       />

    {data ? 
    <Pressable style={styles.item} onPress={() => navigation.navigate('Weather',{city: data.name})}>
      <IconImg main={data.weather[0].main} size={40}/>
       <Text style={{marginHorizontal:10}}>{data.name}</Text>
      
      
    
    </Pressable>
    : null}
  



    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  searctInput:{
    borderBottomWidth: 1,
    width:'100%',
    padding:10
  },
  item:{
    padding:10,
    backgroundColor: '#e2e3e5',
    margin:10,
    borderRadius:5,
    flexDirection: 'row',
    alignItems:  'center',
   
  }
})