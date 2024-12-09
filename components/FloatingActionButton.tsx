import { styled } from "tamagui";

import { Button } from "./Button";

export const FloatingActionButton = styled(Button, {
  theme: "accent",
  bottom: "$10",
  left: 0,
  right: 0,
  margin: "auto",
  borderRadius: "$12",
});
