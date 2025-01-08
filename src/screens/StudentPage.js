import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, updateStudent, deleteStudent } from '../store/studentSlice';

export default function StudentPage() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [universityId, setUniversityId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const students = useSelector(state => state.students);
  const universities = useSelector(state => state.universities);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (editingId) {
      dispatch(updateStudent({ id: editingId, name, birthDate, universityId }));
      setEditingId(null);
    } else {
      dispatch(addStudent({ id: Date.now(), name, birthDate, universityId }));
    }
    setName('');
    setBirthDate('');
    setUniversityId(null);
  };

  const handleEdit = (student) => {
    setName(student.name);
    setBirthDate(student.birthDate);
    setUniversityId(student.universityId);
    setEditingId(student.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Birth Date (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <TextInput
        placeholder="University ID"
        value={universityId}
        onChangeText={(text) => setUniversityId(Number(text))}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title={editingId ? "Update Student" : "Add Student"} onPress={handleAddOrUpdate} />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name} - {item.birthDate} - University ID: {item.universityId}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => dispatch(deleteStudent(item.id))} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8 },
  listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
});