import { CollectionConfig } from 'payload'

export const Attendees: CollectionConfig = {
  slug: 'attendee',
  access: {
    read: () => true,
    create: () => true,
  },
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
    {
      name: 'comments',
      type: 'textarea',
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'event',
      required: true,
    },
  ],
}
