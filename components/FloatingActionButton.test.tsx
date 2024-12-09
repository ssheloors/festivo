import { FloatingActionButton } from "./FloatingActionButton";

import { render } from "@/test-utils";

it(`renders correctly`, () => {
  const { asFragment } = render(
    <FloatingActionButton>Foo</FloatingActionButton>,
  );

  expect(asFragment()).toMatchSnapshot();
});
