import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import { FormField } from "./FormField";

import { render } from "@/test-utils";

function FormWrapper<T extends FieldValues>({
  defaultValues,
  children,
}: {
  defaultValues?: UseFormProps<T>["defaultValues"];
  children: (form: UseFormReturn<T>) => JSX.Element;
}) {
  const form = useForm({ defaultValues });

  return children(form);
}

it(`renders correctly`, () => {
  const { asFragment } = render(
    <FormWrapper defaultValues={{ testInput: "testInputValue" }}>
      {(form) => (
        <FormField
          form={form}
          label="Test input"
          name="testInput"
          inputProps={{ className: "test-class" }}
        />
      )}
    </FormWrapper>,
  );

  expect(asFragment()).toMatchSnapshot();
});
