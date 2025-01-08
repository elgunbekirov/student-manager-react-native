import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
  const students = useSelector(state => state.students);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditStudent', { student: item })}
            style={styles.studentItem}
          >
            <Text>{item.name} ({item.age})</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Student" onPress={() => navigation.navigate('AddStudent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  studentItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
});