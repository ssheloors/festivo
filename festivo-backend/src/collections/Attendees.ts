import { CollectionConfig } from 'payload'

export const Attendees: CollectionConfig = {
  slug: 'attendee',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
  ],
}
