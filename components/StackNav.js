import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WeatherScreen from '../screens/WeatherScreen';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
   <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
     name='Home'
     component={HomeScreen}
     options={{
        title: 'Weather app',
        headerStyle: {backgroundColor: '#ea6d4a'}
     }}
    />
    <Stack.Screen
    name='Search'
    component={SearchScreen}
    options={{
        title: 'Search any location',
        headerStyle: {backgroundColor: '#ea6d4a'}
     }}
    />
        <Stack.Screen
    name='Weather'
    component={WeatherScreen}
    options={{
        title: 'Weather app',
        headerStyle: {backgroundColor: '#ea6d4a'}
     }}
    />



  </Stack.Navigator> 
    </NavigationContainer>

  )
}

export default StackNav

const styles = StyleSheet.create({})