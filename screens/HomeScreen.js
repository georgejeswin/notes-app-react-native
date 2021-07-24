import React from 'react';
import { AsyncStorage, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { useEffect } from 'react';
import { useState } from 'react';

export default function HomeScreen({navigation}) {

  const [data,setData]=useState([])

  useEffect(()=>{
    fetchData();
  },[])

  const pressHandler=()=>{
    navigation.navigate('Add')
  }

  const fetchData=async()=>{
    await AsyncStorage.getAllKeys().then(async(keys)=>{
      try {
        const newData=await AsyncStorage.multiGet(keys);
        setData(newData);
      } catch (error) {
        console.log(error);
      }
    })
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item,index)=>item[0].toString()}
        renderItem={({item})=>{
          const note=JSON.parse(item[1])
          return(
            <TouchableOpacity onPress={()=>{}}>
              <View style={styles.listItem}>
                <Text>{note.title}</Text>
                <Text>{note.content} </Text>
                <Text>{note.date}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <TouchableOpacity style={styles.fab} onPress={pressHandler}>
        <MaterialIcons
        name='add'
        size={30}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // padding:20
  },
  fab:{
    width:60,
    height:60,
    backgroundColor:'#f1c40f',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    shadowColor:'#000000',
    shadowOpacity:0.2,
    shadowOffset:{
      height:2,
      width:2
    },
    shadowRadius:8,
    position:'absolute',
    right:40,
    bottom:40
  },
  listItem:{
    width:Dimensions.get('window').width-40,
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:'#EFEFEF',
    marginTop:10,
    borderRadius:20
  }
});
