import React from "react";
import { useState } from "react";
import { AsyncStorage, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";

const AddScreen = ({navigation}) => {
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //   const showTimepicker = () => {
  //     showMode("time");
  //   };

  const addNotes=async()=>{
    // console.log(values.title,values.content,date);
    if(values.title!==''&& values.content!==''){
        const data={
            title:values.title,
            date:date,
            content:values.content
        }

        await AsyncStorage.setItem(
            Date.now().toString(),
            JSON.stringify(data)
        ).then(()=>{
            navigation.navigate('Home');
        })
        .catch(err=>console.log(err))

    }else{
        alert('Please Enter some Data')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
      <TextInput
        label="Title"
        style={styles.input}
        value={values.title}
        onChangeText={(text) => setValues({ ...values, title: text })}
      />
      <TextInput
        label="content"
        style={styles.input}
        value={values.content}
        multiline
        onChangeText={(text) => setValues({ ...values, content: text })}
      />
      <TextInput
        label="Due Date"
        style={styles.input}
        value={date.toString().slice(0, 15)}
        disabled
        // onChangeText={(text) => setValues({ ...values, date: text })}
      />
      <View>
        <Button mode="text" icon='calendar' onPress={showDatepicker} style={styles.button}>
          Show Calender
        </Button>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Button icon='note-multiple' mode="contained" onPress={() => addNotes()}>
        Add Notes
      </Button>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40,
  },
  input: {
    marginBottom: 15,
  },
  button:{
      marginBottom:20,
      color:'#fff'
    //   backgroundColor:'coral'
  }
});
