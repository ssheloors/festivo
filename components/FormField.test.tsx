import {
  FieldValues,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import renderer from "react-test-renderer";

import { FormField } from "./FormField";
import { TestProvider } from "./TestProvider";

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
  const tree = renderer
    .create(
      <TestProvider>
        <FormWrapper defaultValues={{ testInput: "testInputValue" }}>
          {(form) => (
            <FormField
              form={form}
              label="Test input"
              name="testInput"
              inputProps={{ className: "test-class" }}
            />
          )}
        </FormWrapper>
      </TestProvider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
