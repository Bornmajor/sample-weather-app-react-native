import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function Cloudy({size}){
    return <Entypo name="cloud" size={size} color="#ea6d4a" />
}

function Rainy({size}){
   return <Ionicons name="rainy" size={size} color="#ea6d4a" />
}

function Snow({size}){
return <Ionicons name="snow" size={size} color="#ea6d4a" />
}

function Others({size}){
return <MaterialCommunityIcons name="weather-cloudy-alert" size={size} color="#ea6d4a" />
}

function Clear({size}){
   return <Ionicons name="sunny" size={size} color="#ea6d4a" />
}

function Mist({size}){
   return <MaterialCommunityIcons name="weather-fog" size={size} color="#ea6d4a" />
}

const IconImg = ({main,size}) => {
    if(main == 'Clouds'){
       return <Cloudy size={size} /> 
    }else if(main  == 'Rain'){
       return <Rainy size={size} />
    }else if(main == 'Snow'){
      return <Snow size={size} />
    }else if(main == 'Clear'){
      return <Clear size={size} />
   }else if(main == 'Mist'){
      return <Mist size={size} />
   }else{
     return <Others size={size} />
    }
    
}

export default IconImg;

const styles = StyleSheet.create({})