import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'event',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'organizer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'attendees',
      type: 'relationship',
      relationTo: 'attendee',
      hasMany: true,
    },
  ],
}
