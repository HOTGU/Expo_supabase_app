import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ThemeText from "@/components/ThemeText";
import ThemePressable from "@/components/ThemePress";
import ThemeButton from "@/components/ThemeButton";
import { Poll, Vote } from "@/types/db";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selected, setSelected] = useState("");
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const { user } = useAuth();

  if (!user) return <Redirect href="/login" />;

  if (!id) {
    return <ActivityIndicator />;
  }

  const vote = async () => {
    const newVote = {
      option: selected,
      poll_id: poll?.id,
      user_id: user.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }
    const { data, error } = await supabase
      .from("votes")
      .upsert(newVote)
      .select()
      .single();
    if (error) {
      Alert.alert("Failed to vote");
      return;
    }
    setUserVote(data);
    Alert.alert("Thank you for your vote");
  };

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert("Error fetching data");
      }
      setPoll(data);
    };

    const fetchUserVote = async () => {
      if (!user) {
        return;
      }
      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelected(data.option);
      }
    };

    fetchPolls();
    fetchUserVote();
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
