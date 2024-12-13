import { forwardRef, Ref } from "react";
import {
  SizableText,
  SizableTextProps,
  styled,
  TamaguiElement,
  TamaguiTextElement,
  ThemeName,
  XStack,
} from "tamagui";

export interface ChipData {
  text: string;
  theme: ThemeName;
  containerProps?: SizableTextProps;
}

export const Chip = styled(
  forwardRef(function Chip(
    {
      text,
      containerProps,
    }: { text: string; containerProps?: SizableTextProps },
    ref: Ref<TamaguiTextElement>,
  ) {
    return (
      <SizableText
        color="$color12"
        backgroundColor="$color4"
        size="$2"
        fontWeight="bold"
        paddingInline="$3"
        borderRadius="$radius.true"
        flex={0}
        ref={ref}
        {...containerProps}
      >
        {text}
      </SizableText>
    );
  }),
);

export const Chips = styled(
  forwardRef(function Chips(
    { chips }: { chips: ChipData[] },
    ref: Ref<TamaguiElement>,
  ) {
    return (
      <XStack flexWrap="wrap" justifyContent="flex-start" gap="$2" ref={ref}>
        {chips.map((chip) => (
          <Chip
            key={chip.text}
            text={chip.text}
            theme={chip.theme}
            containerProps={chip.containerProps}
          />
        ))}
      </XStack>
    );
  }),
);
