import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface IThemePressable extends PressableProps {
  children?: React.ReactNode;
  center?: boolean;
  label: string;
  icon?: React.ReactNode;
  type?: "default" | "tint";
}

const ThemePressable = ({
  children,
  type = "default",
  label,
  center,
  icon,
  ...rest
}: IThemePressable) => {
  const theme = useColorScheme() ?? "light";

  const bgColor =
    type === "tint" ? Colors[theme]["tint"] : Colors[theme]["button"];

  const textColor = type === "tint" ? "white" : Colors[theme]["text"];

  return (
    <Pressable
      style={[
        { backgroundColor: bgColor },
        center && { alignItems: "center", justifyContent: "center" },
        type === "tint" && styles.tintContainer,
        type === "default" && styles.container,
      ]}
      {...rest}
    >
      {icon && icon}
      <Text style={[{ color: textColor }, type === "tint" && styles.tintText]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default ThemePressable;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
  },
  tintContainer: {
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
  },
  tintText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
