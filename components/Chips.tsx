import { SizableText, styled, ThemeName, XStack } from "tamagui";

export interface ChipData {
  text: string;
  theme: ThemeName;
}

export const Chip = styled(function Chip({ text }: { text: string }) {
  return (
    <SizableText
      color="$color12"
      backgroundColor="$color4"
      size="$2"
      fontWeight="bold"
      paddingInline="$3"
      borderRadius="$radius.true"
      flex={0}
    >
      {text}
    </SizableText>
  );
});

export const Chips = styled(function Chips({ chips }: { chips: ChipData[] }) {
  return (
    <XStack flexWrap="wrap" justifyContent="flex-start" gap="$2">
      {chips.map((chip) => (
        <Chip text={chip.text} theme={chip.theme} />
      ))}
    </XStack>
  );
});
