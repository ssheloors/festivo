import { ReactNode } from "react";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import {
  Input,
  InputProps,
  Label,
  SizableText,
  SizableTextProps,
  YStack,
} from "tamagui";

export function FormField<T extends FieldValues>({
  form,
  label,
  name,
  inputProps,
}: {
  form: UseFormReturn<T>;
  label: ReactNode;
  name: Path<T>;
  inputProps: InputProps;
}) {
  return (
    <YStack alignItems="stretch">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, ...field } }) => (
          <Input
            id={name}
            {...inputProps}
            {...field}
            onChangeText={onChange}
            opacity={field.disabled ? 0.5 : 1}
          />
        )}
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
