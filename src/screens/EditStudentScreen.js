import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateStudent } from '../store/studentSlice';

export default function EditStudentScreen({ route, navigation }) {
  const { student } = route.params;
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age.toString());
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateStudent({ id: student.id, name, age: parseInt(age, 10) }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <Button title="Update Student" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8 },
});