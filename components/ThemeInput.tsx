import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface IThemeText extends TextInputProps {
  type?: "title" | "bold" | "default" | "thin";
  chidren?: string;
}

const ThemeInput = ({ type = "default", children, ...rest }: IThemeText) => {
  const theme = useColorScheme() ?? "light";

  const color = Colors[theme]["text"];
  const backgroundColor = Colors[theme]["button"];

  return (
    <TextInput
      {...rest}
      style={[{ color, backgroundColor }, styles.container]}
    />
  );
};

export default ThemeInput;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});
