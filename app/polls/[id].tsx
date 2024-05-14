import { StyleSheet, Text, View, ViewBase } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ThemeText from "@/components/ThemeText";
import ThemePressable from "@/components/ThemePress";
import ThemeButton from "@/components/ThemeButton";

const detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState("React Native");

  const poll = {
    question: "React Native vs Flutter",
    options: ["React Native", "Flutter", "SwiftUI"],
  };

  const vote = () => {
    console.warn("hello");
  };
  return (
    <View style={{ padding: 10 }}>
      <Stack.Screen
        options={{
          title: `Poll voting`,
          headerBackTitleVisible: false,
        }}
      />
      <View style={{ marginBottom: 20 }}>
        <ThemeText type="title">{poll.question}</ThemeText>
      </View>
      <View style={{ gap: 10 }}>
        {poll.options.map((item) => (
          <ThemePressable
            key={item}
            onPress={() => setSelected(item)}
            icon={
              <Feather
                name={item === selected ? "check-circle" : "circle"}
                size={18}
                color={item === selected ? "green" : "gray"}
              />
            }
            label={item}
          />
        ))}
        <ThemePressable onPress={vote} type="tint" label="vote" center />
      </View>
    </View>
  );
};

export default detail;

const styles = StyleSheet.create({});
