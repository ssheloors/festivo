import { fireEvent, render, screen } from "@/test-utils";

// eslint-disable-next-line import/order
import EventCreationPage from "./index";
// eslint-disable-next-line import/order
import { createPayloadClient } from "../../utils/payload-client";

it(`submits inputted values`, async () => {
  render(<EventCreationPage />);

  const titleInput = screen.getByTestId("title-input");
  const addressInput = screen.getByTestId("address-input");
  const descriptionInput = screen.getByTestId("description-input");
  const submitButton = screen.getByTestId("submit-button");

  const title = "foo";
  const address = "bar";
  const description = "baz";

  fireEvent.input(titleInput, title);
  fireEvent.input(addressInput, address);
  fireEvent.input(descriptionInput, description);

  fireEvent.click(submitButton);

  const eventCreateMock = createPayloadClient.__mocks.assign(
    "collection-event-create",
    jest.fn(),
  );

  expect(eventCreateMock).toHaveBeenCalledWith(
    expect.objectContaining({
      title,
      address,
      description,
    }),
  );
});
