import { Button, Input, Label, SizableText, YStack } from "tamagui";

export default function Register() {
  return (
    <YStack padding="$4" gap="$8">
      <YStack alignItems="center" paddingTop="$6">
        <SizableText size="$14">🎉</SizableText>
        <SizableText size="$8" textAlign="center">
          Welcome to Festivo!
        </SizableText>
      </YStack>

      <YStack gap="$2">
        <YStack alignItems="stretch">
          <Label htmlFor="name">Name</Label>
          <Input id="name" textContentType="name" />
        </YStack>

        <YStack alignItems="stretch">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
        </YStack>

        <YStack alignItems="stretch">
          <Label htmlFor="password">Password</Label>
          <Input id="password" secureTextEntry textContentType="password" />
        </YStack>
      </YStack>

      <Button backgroundColor="pink" disabled>
        Sign up
      </Button>
    </YStack>
  );
}
