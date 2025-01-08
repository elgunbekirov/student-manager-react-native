import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addUniversity, updateUniversity, deleteUniversity } from '../store/universitySlice';

export default function UniversityPage() {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const universities = useSelector(state => state.universities);
  const dispatch = useDispatch();

  const handleAddOrUpdate = () => {
    if (editingId) {
      dispatch(updateUniversity({ id: editingId, name }));
      setEditingId(null);
    } else {
      dispatch(addUniversity({ id: Date.now(), name }));
    }
    setName('');
  };

  const handleEdit = (university) => {
    setName(university.name);
    setEditingId(university.id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="University Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title={editingId ? "Update University" : "Add University"} onPress={handleAddOrUpdate} />
      <FlatList
        data={universities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => dispatch(deleteUniversity(item.id))} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 16, padding: 8 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
});