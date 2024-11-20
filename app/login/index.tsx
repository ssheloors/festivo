import { Link } from "expo-router";
import React from "react";
import { Button, YStack } from "tamagui";

export default function Login() {
  return (
    <YStack height="100%" padding="$2">
      <Link href="/login/register" asChild>
        <Button variant="outlined">Register</Button>
      </Link>
    </YStack>
  );
}
