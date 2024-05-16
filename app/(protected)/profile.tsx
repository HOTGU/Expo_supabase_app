import ThemePressable from "@/components/ThemePress";
import ThemeText from "@/components/ThemeText";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <ThemePressable
        type="tint"
        label="Sign out"
        center
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
}
