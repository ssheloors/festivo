import {
  fireEvent,
  payloadTestClient,
  render,
  screen,
  waitFor,
} from "@/test-utils";

import EventCreationPage from "../../../app/event/create";
import { user } from "../../../hooks/__mocks__/use-user";

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

  await waitFor(() =>
    expect(payloadTestClient.collections.event.create).toHaveBeenCalledWith({
      doc: expect.objectContaining({
        title,
        address,
        description,
        organizer: user.id,
      }),
    }),
  );
});
