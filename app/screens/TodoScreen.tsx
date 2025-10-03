import text from "@/constants/text";
import { Colors, ThemeName } from "@/constants/theme";
import { Todo } from "@/data/Todo";
import { TodoGroup } from "@/data/TodoGroup";
import { useTheme } from "@/hooks/ThemeContext";
import { groupTodos } from "@/utils/DateUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, TextField } from "react-native-ui-lib";
import ScreenTemplate from "../components/templates/ScreenTemplate";

const TodoScreen = () => {
  const { themeName, theme } = useTheme();
  const styles = createStyles(themeName);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = "@todos";

  useEffect(() => {
    const loadTodos = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const flatTodos: Todo[] = JSON.parse(saved);
        setTodos(flatTodos);
        setGroups(groupTodos(flatTodos));
      }
    };
    loadTodos();
  }, []);

  // Toggle completed
  const toggleTodo = (todoId: number | string) => {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, completed: !t.completed } : t
    );
    setTodos(updatedTodos);
    setGroups(groupTodos(updatedTodos));
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  // Add new todo to latest month
  const addTodo = () => {
    if (!value.trim()) return;
    const now = new Date();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: value.trim(),
      createdAt: new Date(2000, 1, 13).toISOString(),
      completed: false,
    };
    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setGroups(groupTodos(updatedTodos));
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));

    // Clear input + edit cache
    setValue("");
    setEditValues({});
  };

  const updateTodo = (todoId: string, newTitle: string) => {
    const trimmed = newTitle.trim();

    if (!trimmed) {
      // If erased completely → remove the todo
      const updatedTodos = todos.filter((t) => t.id !== todoId);
      setTodos(updatedTodos);
      setGroups(groupTodos(updatedTodos));
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
      return;
    }

    // Otherwise → update title
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, title: trimmed } : t
    );
    setTodos(updatedTodos);
    setGroups(groupTodos(updatedTodos));
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
  };

  // Update local text while typing
  const handleEditChange = (todoId: string, text: string) => {
    setEditValues((prev) => ({ ...prev, [todoId]: text }));
  };

  // Save on Enter / Blur
  const handleEditSubmit = (todoId: string) => {
    const text = editValues[todoId] ?? "";
    updateTodo(todoId, text);
    setEditValues((prev) => {
      const copy = { ...prev };
      delete copy[todoId]; // cleanup after save
      return copy;
    });
  };

  const renderTodo = (todo: Todo) => {
    const currentValue = editValues[todo.id] ?? todo.title;

    return (
      <View key={todo.id} style={styles.todoItem}>
        <Checkbox
          value={todo.completed}
          onValueChange={() => toggleTodo(todo.id)}
          color={theme.textPrimary}
        />
        <TextField
          value={currentValue}
          onChangeText={(text) => handleEditChange(todo.id, text)}
          onSubmitEditing={() => handleEditSubmit(todo.id)}
          onEndEditing={() => handleEditSubmit(todo.id)}
          style={[styles.todoText, todo.completed && styles.completedText]}
          selectionColor={theme.textPrimary}
          placeholder=""
          validateOnBlur={true}
        />
      </View>
    );
  };

  return (
    <ScreenTemplate title={text.Moment.bucketList}>
      {groups.length > 0 ? (
        <ScrollView style={styles.container}>
          {groups.map((group, idx) => (
            <View key={group.title} style={styles.groupContainer}>
              <Text style={styles.groupTitle}>{group.title}</Text>

              {/* Input only for latest month (first index) */}
              {idx === 0 && group.title !== "Past Years" && (
                <View style={styles.inputRow}>
                  <Checkbox value={false} disabled color={theme.textPrimary} />
                  <TextField
                    placeholder={text.Moment.addNewTodo}
                    value={value}
                    onChangeText={setValue}
                    onSubmitEditing={addTodo}
                    blurOnSubmit={false}
                    style={styles.input}
                    selectionColor={theme.textPrimary}
                  />
                </View>
              )}

              {group.items.map(renderTodo)}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={styles.inputRow}>
            <Checkbox value={false} disabled color={theme.textPrimary} />
            <TextField
              placeholder="Write and press Enter..."
              value={value}
              onChangeText={setValue}
              onSubmitEditing={addTodo}
              blurOnSubmit={false}
              style={styles.input}
              containerStyle={{ maxHeight: 60, width: "100%" }}
              selectionColor={theme.textPrimary}
            />
          </View>
        </View>
      )}
    </ScreenTemplate>
  );
};

const createStyles = (themeName: ThemeName) => {
  const theme = Colors[themeName];
  return StyleSheet.create({
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
    },
    todoText: {
      fontSize: 16,
      color: theme.textPrimary,
      textAlign: "center",
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      marginLeft: 6,
    },
    completedText: {
      textDecorationLine: "line-through",
    },
    container: {
      flex: 1,
      width: "100%",
    },
    groupContainer: {
      marginBottom: 12,
    },
    groupTitle: {
      fontSize: 18,
      color: theme.textPrimary,
      textAlign: "left",
      fontFamily: "Roboto_500Medium",
      letterSpacing: 0,
      marginBottom: 12,
    },
    inputRow: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    input: {
      height: 30,
      fontSize: 16,
      fontFamily: "Roboto_300Light",
      letterSpacing: 0,
      color: theme.textSecondary,
      marginLeft: 6,
    },
  });
};

export default TodoScreen;
