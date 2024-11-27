import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  getTokens,
  ScrollView,
  SizableText,
  Spinner,
  YStack,
} from "tamagui";
import { z } from "zod";

import { ErrorMessage, FormField } from "@/components/FormField";
import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Login() {
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
    >
      <ScrollView>
        <YStack
          padding="$4"
          paddingBottom={getTokens().space.$4.val + bottomInset}
          gap="$8"
        >
          <Link href="/login/register" asChild>
            <Button variant="outlined">Register</Button>
          </Link>

          <YStack alignItems="center" paddingTop="$6">
            <SizableText size="$14">🥳</SizableText>
            <SizableText size="$8" textAlign="center">
              Sign in to host events!
            </SizableText>
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

          <Button
            variant="outlined"
            onPress={onSubmit}
            icon={form.formState.isSubmitting ? <Spinner /> : null}
          >
            Log in
          </Button>

          <ErrorMessage error={login.error} />
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
