import {
  fireEvent,
  memoryStorage,
  payloadTestClient,
  render,
  screen,
  setLocalSearchParams,
  waitFor,
} from "@/test-utils";

import AttendeeDetailsPage from "../../../app/(tabs)/(index,host)/event/[id]/join";

it(`submits inputted values`, async () => {
  const event = {
    id: "99",
    code: "POGGER",
  };

  setLocalSearchParams(event);

  payloadTestClient.collections.event.find.mockReturnValue(
    Promise.resolve({ docs: [event] }),
  );
  const attendee = {
    id: 999,
  };
  const attendeeCreateFn =
    payloadTestClient.collections.attendee.create.mockReturnValue({
      doc: attendee,
    });

  render(<AttendeeDetailsPage />);

  const nameInput = screen.getByTestId("name-input");
  const emailInput = screen.getByTestId("email-input");
  const commentsInput = screen.getByTestId("comments-input");
  const submitButton = screen.getByTestId("submit-button");

  const name = "foo";
  const email = "bar@example.com";
  const comments = "baz";

  fireEvent.changeText(nameInput, name);
  fireEvent.changeText(emailInput, email);
  fireEvent.changeText(commentsInput, comments);

  fireEvent.press(submitButton);

  await waitFor(() =>
    expect(attendeeCreateFn).toHaveBeenCalledWith({
      doc: expect.objectContaining({
        name,
        email,
        comments,
      }),
    }),
  );

  expect(memoryStorage.get(`event-attendance-${event.id}`)).toEqual(
    JSON.stringify(attendee),
  );
});
