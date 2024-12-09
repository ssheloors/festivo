import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTokens, ScrollView, SizableText, Spinner, YStack } from "tamagui";
import { z } from "zod";

import { FloatingActionButton } from "@/components/FloatingActionButton";
import { ErrorMessage, FormField } from "@/components/FormField";
import { useCreateUser } from "@/hooks/use-create-user";
import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Register() {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createUser = useCreateUser();
  const login = useLogin();

  const onSubmit = form.handleSubmit(async (data) => {
    await createUser.mutateAsync(data);
    await login.mutateAsync(data);
    router.dismissAll();
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
            <SizableText size="$14">🎉</SizableText>
            <SizableText size="$8" textAlign="center">
              Welcome to Festivo!
            </SizableText>
          </YStack>

          <YStack gap="$2">
            <FormField
              form={form}
              label="Name"
              name="name"
              inputProps={{
                textContentType: "name",
                autoCapitalize: "words",
              }}
            />

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

          <ErrorMessage error={createUser.error ?? login.error} />
        </YStack>
      </ScrollView>

      <FloatingActionButton
        onPress={onSubmit}
        icon={form.formState.isSubmitting ? <Spinner /> : null}
      >
        Sign up
      </FloatingActionButton>
    </KeyboardAvoidingView>
  );
}
