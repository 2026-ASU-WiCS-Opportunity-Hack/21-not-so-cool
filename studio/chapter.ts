export default {
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  fields: [
    { name: 'slug', title: 'Slug (e.g. usa)', type: 'slug', options: { source: 'name' } },
    { name: 'name', title: 'Chapter Name', type: 'string' },
    { name: 'headline', title: 'Hero Headline', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'heroImage', title: 'Hero Image', type: 'image' },
    {
      name: 'events', title: 'Events', type: 'array',
      of: [{
        type: 'object', fields: [
          { name: 'title', type: 'string' },
          { name: 'date', type: 'datetime' },
          { name: 'description', type: 'text' },
          { name: 'registrationUrl', type: 'url' },
        ]
      }]
    },
    {
      name: 'team', title: 'Team Members', type: 'array',
      of: [{
        type: 'object', fields: [
          { name: 'name', type: 'string' },
          { name: 'role', type: 'string' },
          { name: 'bio', type: 'text' },
          { name: 'photo', type: 'image' },
        ]
      }]
    },
  ]
}