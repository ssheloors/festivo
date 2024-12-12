import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import { SizableText, Spinner, XStack, YStack } from "tamagui";
import { z } from "zod";

import { CustomContainer } from "@/components/CustomContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { ErrorMessage, FormField } from "@/components/FormField";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const login = useLogin();

  const onSubmit = form.handleSubmit(async (data) => {
    await login.mutateAsync(data);
    router.replace({
      pathname: "/(tabs)/(host)/host",
    });
  });

  return (
    <CustomContainer
      scroll
      cta={
        <FloatingActionButton
          onPress={onSubmit}
          icon={form.formState.isSubmitting ? <Spinner /> : null}
          iconAfter={<IconSymbol name="arrow.right" color="$color12" />}
          disabled={!form.formState.isValid}
        >
          Log in
        </FloatingActionButton>
      }
    >
      <YStack padding="$4" paddingTop="$10" gap="$4" onPress={Keyboard.dismiss}>
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
              <TouchableOpacity>
                <SizableText color="$accentColor">Sign up here</SizableText>
              </TouchableOpacity>
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
    </CustomContainer>
  );
}
