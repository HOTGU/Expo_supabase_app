import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href={"/login"} />;
  }
  return <Slot />;
}
