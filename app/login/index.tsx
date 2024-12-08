import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  getTokens,
  ScrollView,
  SizableText,
  Spinner,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui";
import { z } from "zod";

import { FloatingActionButton } from "@/components/FloatingActionButton";
import { ErrorMessage, FormField } from "@/components/FormField";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Login() {
  const theme = useTheme();

  const { bottom: bottomInset } = useSafeAreaInsets();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const login = useLogin();

  const onSubmit = form.handleSubmit(async (data) => {
    await login.mutateAsync(data);
    router.back();
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <YStack
          padding="$4"
          paddingBottom={getTokens().space.$4.val + bottomInset}
          gap="$8"
        >
          <YStack alignItems="center" paddingTop="$6">
            <SizableText size="$14">🥳</SizableText>
            <SizableText size="$8" textAlign="center">
              Sign in to host events!
            </SizableText>

            <XStack
              gap="$2"
              alignItems="center"
              justifyContent="center"
              paddingTop="$4"
            >
              <SizableText>Don't have an account yet?</SizableText>
              <Link href="/login/register" asChild>
                <Pressable>
                  <SizableText color="$accentColor">Sign up here</SizableText>
                </Pressable>
              </Link>
            </XStack>
          </YStack>

          <YStack gap="$2">
            <FormField
              form={form}
              label="Email"
              name="email"
              inputProps={{
                keyboardType: "email-address",
                textContentType: "emailAddress",
                autoCapitalize: "none",
              }}
            />

            <FormField
              form={form}
              label="Password"
              name="password"
              inputProps={{
                secureTextEntry: true,
                textContentType: "password",
              }}
            />
          </YStack>

          <ErrorMessage error={login.error} />
        </YStack>
      </ScrollView>

      <FloatingActionButton
        onPress={onSubmit}
        icon={form.formState.isSubmitting ? <Spinner /> : null}
        iconAfter={<IconSymbol name="arrow.right" color="$color12" />}
      >
        Log in
      </FloatingActionButton>
    </KeyboardAvoidingView>
  );
}
