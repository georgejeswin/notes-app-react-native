import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddScreen from './screens/AddScreen';
import NoteScreen from './screens/NoteScreen';

const Stack=createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
       <Stack.Screen name='Add Note' component={AddScreen} />
       <Stack.Screen name='Note' component={NoteScreen}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}
