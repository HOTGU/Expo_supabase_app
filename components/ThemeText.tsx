import {
  StyleSheet,
  Text,
  TextProps,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface IThemeText extends TextProps {
  type?: "title" | "bold" | "default" | "thin";
  chidren?: string;
}

const ThemeText = ({ type = "default", children, ...rest }: IThemeText) => {
  const theme = useColorScheme() ?? "light";

  const color = Colors[theme]["text"];

  return (
    <Text
      {...rest}
      style={[
        { color },
        type === "bold" && styles.bold,
        type === "title" && styles.title,
        type === "thin" && styles.thin,
        type === "default" && styles.default,
      ]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  thin: {
    fontWeight: "200",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
