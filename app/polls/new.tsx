import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import ThemeText from "@/components/ThemeText";
import ThemeInput from "@/components/ThemeInput";
import ThemePressable from "@/components/ThemePress";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const createPoll = () => {
    console.warn("Create poll");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Poll" }} />
      <View style={styles.section}>
        <ThemeText>Title</ThemeText>
        <ThemeInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Type your question here"
        />
      </View>
      <View style={styles.section}>
        <ThemeText>Options</ThemeText>
        {options.map((item, index) => (
          <View style={{ justifyContent: "center" }}>
            <ThemeInput
              value={item}
              onChangeText={(text) => {
                const updated = [...options];
                updated[index] = text;
                setOptions(updated);
              }}
              placeholder={`Option ${index + 1}`}
            />
            <Feather
              name="x"
              size={18}
              color="gray"
              style={{ position: "absolute", right: 10 }}
              onPress={() => {
                const updated = [...options];
                updated.splice(index, 1);
                setOptions(updated);
              }}
            />
          </View>
        ))}
        <ThemePressable
          label="Add Options"
          onPress={() => setOptions([...options, ""])}
          center
          icon={<AntDesign name="pluscircle" size={18} color="gray" />}
        />
      </View>

      <View style={styles.section}>
        <ThemePressable
          type="tint"
          label="Create Poll"
          center
          onPress={createPoll}
        />
      </View>
    </View>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: { padding: 10, gap: 5 },
  section: {
    marginTop: 10,
    gap: 5,
  },
});
