import {
  memoryStorage,
  payloadTestClient,
  render,
  screen,
  setLocalSearchParams,
} from "@/test-utils";

import EventPage from "../../../app/(tabs)/(index,host)/event/[id]";

import { user as mockUser } from "@/hooks/__mocks__/use-user";
import { PayloadConfig } from "@/utils/payload-client";

const event: PayloadConfig["collections"]["event"] = {
  id: 99,
  title: "foo",
  organizer: 999,
  eventCode: "AAABBB",
  eventDate: new Date().toISOString(),
  address: "bar",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

beforeEach(() => {
  setLocalSearchParams({
    id: event.id.toString(),
  });

  payloadTestClient.collections.event.find.mockReturnValue({
    docs: [event],
  });
});

function joinEvent() {
  memoryStorage.set(
    `event-attendance-${event.id}`,
    JSON.stringify({
      id: 999,
    }),
  );
}

it(`shows that the event has been joined`, async () => {
  joinEvent();

  render(<EventPage />);

  await screen.findByTestId("joined-message");
});

it(`displays a join button if not joined`, async () => {
  render(<EventPage />);

  await screen.findByTestId("join-button");
});

it(`displays a cancel button if joined`, async () => {
  joinEvent();

  render(<EventPage />);

  await screen.findByTestId("cancel-button");
});

it(`displays an edit button if user owns event`, async () => {
  payloadTestClient.collections.event.find.mockReturnValue({
    docs: [{ ...event, organizer: mockUser }],
  });

  render(<EventPage />);

  await screen.findByTestId("edit-button");
});
