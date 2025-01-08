import React, { useState } from 'react';
import { View, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../store/studentSlice';

export default function AddStudentScreen({ navigation }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [universityId, setUniversityId] = useState(null);
  const universities = useSelector(state => state.universities);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addStudent({ id: Date.now(), name, birthDate, universityId: parseInt(universityId, 10) }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Birth Date (YYYY-MM-DD)" value={birthDate} onChangeText={setBirthDate} style={styles.input} />
      <Picker selectedValue={universityId} onValueChange={setUniversityId} style={styles.input}>
        {universities.map(univ => (
          <Picker.Item key={univ.id} label={univ.name} value={univ.id.toString()} />
        ))}
      </Picker>
      <Button title="Add Student" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8 },
});