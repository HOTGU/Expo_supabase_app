import ThemeLink from "@/components/ThemeLink";
import ThemeText from "@/components/ThemeText";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { StyleSheet, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const polls = [1, 2, 3];

export default function HomeScreen() {
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
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <ThemeLink href={`/polls/${item}`}>
            <Feather />
            <ThemeText type="bold">{item}</ThemeText>
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
