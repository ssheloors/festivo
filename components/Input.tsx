import {
  styled,
  Input as TamaguiInput,
  TextArea as TamaguiTextArea,
} from "tamagui";

const styles = {
  placeholderTextColor: "$color5",
} as const;

export const Input = styled(TamaguiInput, styles);

export const TextArea = styled(TamaguiTextArea, {
  ...styles,
  textAlignVertical: "top",
});
