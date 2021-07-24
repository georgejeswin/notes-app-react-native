import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NoteScreen = ({route}) => {
    const {title,content,date}=route.params;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title} >{title}</Text>
                <Text>{content}</Text>
                <Text style={styles.date} >{date.slice(0,10)}</Text>
            </View>
        </View>
    )
}

export default NoteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 40,
      },
      card:{
          backgroundColor:'#EFEFEF',
          padding:30,
          borderRadius:20
      },
      title:{
          fontSize:25,
          fontWeight:'bold',
          marginBottom:20,
      },
      date:{
          color:'coral',
          marginTop:10
      }
})
