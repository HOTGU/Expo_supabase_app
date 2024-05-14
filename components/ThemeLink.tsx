import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ThemeText from "./ThemeText";
import { Link } from "expo-router";

interface IThemeButton extends ViewProps {
  href: string;
  children?: React.ReactNode;
}

const ThemeLink = ({ href, children, ...rest }: IThemeButton) => {
  const theme = useColorScheme() ?? "light";

  const bgColor = Colors[theme]["button"];

  return (
    <Link
      href={href}
      style={[{ backgroundColor: bgColor }, styles.container]}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ThemeLink;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});
