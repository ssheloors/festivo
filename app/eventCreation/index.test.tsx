import { user } from "../../hooks/__mocks__/use-user";

import {
  fireEvent,
  payloadTestClient,
  render,
  screen,
  waitFor,
} from "@/test-utils";

// eslint-disable-next-line import/order
import EventCreationPage from "./index";

it(`submits inputted values`, async () => {
  render(<EventCreationPage />);

  const titleInput = screen.getByTestId("title-input");
  const addressInput = screen.getByTestId("address-input");
  const descriptionInput = screen.getByTestId("description-input");
  const submitButton = screen.getByTestId("submit-button");

  const title = "foo";
  const address = "bar";
  const description = "baz";

  fireEvent.changeText(titleInput, title);
  fireEvent.changeText(addressInput, address);
  fireEvent.changeText(descriptionInput, description);

  fireEvent.press(submitButton);

  await waitFor(() => {
    expect(payloadTestClient.collections.event.create).toHaveBeenCalledWith({
      doc: expect.objectContaining({
        title,
        address,
        description,
        organizer: user.id,
      }),
    });
  });
});
