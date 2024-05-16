import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ThemeText from "@/components/ThemeText";
import ThemePressable from "@/components/ThemePress";
import ThemeButton from "@/components/ThemeButton";
import { Poll } from "@/types/db";
import { supabase } from "@/lib/supabase";

const detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selected, setSelected] = useState("");

  if (!id) {
    return <ActivityIndicator />;
  }

  const vote = () => {
    console.warn("hello");
  };

  useEffect(() => {
    const fetchPoll = async () => {
      console.log("Fetching polls...");

      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert("Error fetching data");
        console.log(error);
      }

      data ? setPoll(data) : setPoll(null);
    };
    fetchPoll();
  }, []);

  if (!poll) return <ActivityIndicator />;
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
