import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const universities = useSelector(state => state.universities);
  const students = useSelector(state => state.students);

  const [universityFilter, setUniversityFilter] = useState('');
  const [studentFilter, setStudentFilter] = useState('');

  const filteredUniversities = universities.filter(univ =>
    univ.name.toLowerCase().includes(universityFilter.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentFilter.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Universities</Text>
      <TextInput
        style={styles.input}
        placeholder="Filter Universities"
        value={universityFilter}
        onChangeText={setUniversityFilter}
      />
      <FlatList
        data={filteredUniversities}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.universityItem}>
            <Text>{item.name}</Text>
            <FlatList
              data={filteredStudents.filter(student => student.universityId === item.id)}
              keyExtractor={student => student.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.studentItem}>
                  {item.name} - {item.birthDate}
                </Text>
              )}
            />
          </View>
        )}
      />
      <Text style={styles.title}>Students</Text>
      <TextInput
        style={styles.input}
        placeholder="Filter Students"
        value={studentFilter}
        onChangeText={setStudentFilter}
      />
      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.birthDate}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8 },
  universityItem: { padding: 8, borderBottomWidth: 1, borderColor: '#ccc' },
  studentItem: { marginLeft: 16 },
});