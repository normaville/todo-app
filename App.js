import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Input, CheckBox, Text } from '@rneui/themed';

export default function App() {
  // 1. State for tasks (with default tasks)
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Complete React Native Homework', completed: false },
    { key: '2', description: 'Install Expo Web packages', completed: true },
  ]);

  const [inputText, setInputText] = useState('');

  // 2. Add new task function
  const addTask = () => {
    if (inputText.trim().length > 0) {
      const newTask = {
        key: Date.now().toString(), // Unique key
        description: inputText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputText(''); // Clear input
    }
  };

  // 3. Toggle completion
  const toggleTask = (key) => {
    setTasks(tasks.map(task => 
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>My To-Do App</Text>

      {/* Input and Add Button */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter a task..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask} // Works with Enter key
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* List of Tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <CheckBox
            title={item.description}
            checked={item.completed}
            onPress={() => toggleTask(item.key)}
            // Strikethrough style if completed
            textStyle={
              item.completed 
                ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } 
                : null
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#fff' },
  title: { textAlign: 'center', marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
});
