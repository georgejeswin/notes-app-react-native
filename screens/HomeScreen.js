import React from "react";
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const pressHandler = () => {
    navigation.navigate("Add Note");
  };

  const fetchData = async () => {
    await AsyncStorage.getAllKeys().then(async (keys) => {
      try {
        const newData = await AsyncStorage.multiGet(keys);
        setData(newData);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleDelete=async(key)=>{
    try {
      await AsyncStorage.removeItem(key);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      {data.length>0?(
        <FlatList
        data={data}
        keyExtractor={(item, index) => item[0].toString()}
        renderItem={({ item }) => {
          const note = JSON.parse(item[1]);
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Note", note)}>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.title}>{note.title}</Text>
                  {/* <Text>{note.content} </Text> */}
                  <Text style={styles.date}>{note.date.slice(0, 10)}</Text>
                </View>
                <TouchableOpacity onPress={()=>handleDelete(item[0])}>
                  <MaterialIcons name="delete" size={30} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      ):(
        <Text style={styles.nullText}>Add some Notes</Text>
      )}
      <TouchableOpacity style={styles.fab} onPress={pressHandler}>
        <MaterialIcons name="add" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // padding:20
  },
  fab: {
    width: 60,
    height: 60,
    backgroundColor: "#f1c40f",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 8,
    position: "absolute",
    right: 40,
    bottom: 40,
  },
  listItem: {
    width: Dimensions.get("window").width - 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#EFEFEF",
    marginTop: 15,
    borderRadius: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  date: {
    color: "coral",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nullText:{
    fontSize:20,
    letterSpacing:4,
    color:'skyblue'
  }
});
