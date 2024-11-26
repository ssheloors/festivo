import { CollectionConfig } from 'payload'
import ShortUniqueId from 'short-unique-id'

const uid = new ShortUniqueId({ length: 6 })
uid.setDictionary('alpha_upper')

export const Events: CollectionConfig = {
  slug: 'event',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'eventCode',
      type: 'text', // Use 'text' instead of 'number' for unique ID
      required: true,
      admin: {
        readOnly: true, // Make it read-only in the admin panel
      },
      unique: true, // Make it unique
    },
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
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.eventCode) {
          data.eventCode = uid.rnd()
        }
        return data
      },
    ],
  },
}
