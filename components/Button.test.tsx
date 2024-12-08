import { Button } from "./Button";

import { render } from "@/test-utils";

it(`renders default variant correctly`, () => {
  const { asFragment } = render(<Button>Foo</Button>);

  expect(asFragment()).toMatchSnapshot();
});

it(`renders outlined variant correctly`, () => {
  const { asFragment } = render(<Button variant="outlined">Foo</Button>);

  expect(asFragment()).toMatchSnapshot();
});

it(`renders input variant correctly`, () => {
  const { asFragment } = render(<Button variant="input">Foo</Button>);

  expect(asFragment()).toMatchSnapshot();
});
