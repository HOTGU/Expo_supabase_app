import { Button, ButtonProps, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface IThemeButton extends ButtonProps {}

const ThemeButton = ({ ...rest }: IThemeButton) => {
  const theme = useColorScheme() ?? "light";

  const bgColor = Colors[theme]["button"];

  return <Button {...rest} />;
};

export default ThemeButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});
