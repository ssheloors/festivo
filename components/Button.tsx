import { styled, Button as TamaguiButton } from "tamagui";

export const Button = styled(TamaguiButton, {
  variants: {
    unstyled: {
      false: {
        backgroundcolor: "$color4",
        color: "$color12",
      },
    },

    variant: {
      outlined: {},

      input: {
        borderWidth: 1,
        borderColor: "$color5",
        backgroundColor: "$color2",
        color: "$color9",
        justifyContent: "flex-start",
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});
