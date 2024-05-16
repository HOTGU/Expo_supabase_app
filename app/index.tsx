import ThemeLink from "@/components/ThemeLink";
import ThemeText from "@/components/ThemeText";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet, FlatList, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Poll } from "@/types/db";

const polls = [1, 2, 3];

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("Fetching polls...");

      let { data, error } = await supabase.from("polls").select("*");
      if (error) {
        Alert.alert("Error fetching data");
      }

      console.log(data);
      data ? setPolls(data) : setPolls([]);
    };
    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <Link href="/polls/new">
              <AntDesign name="plus" size={24} color="gray" />
            </Link>
          ),
          headerLeft: () => (
            <Link href="/profile">
              <AntDesign name="user" size={24} color="gray" />
            </Link>
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <ThemeLink href={`/polls/${item}`} key={item.id}>
            <Feather />
            <ThemeText type="bold">{item.question}</ThemeText>
          </ThemeLink>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
  },
  pollContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
