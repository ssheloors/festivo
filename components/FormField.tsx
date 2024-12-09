import { ReactNode } from "react";
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import {
  InputProps,
  Label,
  SizableText,
  SizableTextProps,
  YStack,
} from "tamagui";

import { Input } from "./Input";

export function FormField<T extends FieldValues>({
  form,
  label,
  name,
  inputProps,
  render,
}: {
  form: UseFormReturn<T>;
  label: ReactNode;
  name: Path<T>;
  inputProps?: InputProps;
  render?: (
    props: {
      inputProps: {
        id: string;
        onPress: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
        opacity: number;
      };
    } & Parameters<ControllerProps["render"]>[0],
  ) => JSX.Element;
}) {
  return (
    <YStack alignItems="stretch" width="100%">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, ...field }, ...renderProps }) =>
          render ? (
            render({
              inputProps: {
                id: name,
                onPress: (e) => {
                  e.stopPropagation();
                },
                opacity: field.disabled ? 0.5 : 1,
              },
              field: { ...field, onChange },
              ...renderProps,
            })
          ) : (
            <Input
              id={name}
              onPress={(e) => {
                e.stopPropagation();
              }}
              opacity={field.disabled ? 0.5 : 1}
              {...inputProps}
              {...field}
              onChangeText={onChange}
            />
          )
        }
      />
      <ErrorMessage
        error={form.formState.errors[name] as FieldError | undefined}
      />
    </YStack>
  );
}

export function ErrorMessage({
  error,
  ...props
}: SizableTextProps & { error: FieldError | Error | undefined | null }) {
  if (!error) {
    return null;
  }

  return (
    <SizableText color="red" paddingBlock="$2" size="$2" {...props}>
      {error.message}
    </SizableText>
  );
}
