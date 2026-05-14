// File: client/src/pages/Dashboard/sections/media/media-group-config.js
const MEDIA_GROUPS = [
  {
    key: 'cards',
    title: 'Media Cards',
    description: 'Manage quick-access media categories like photo galleries and albums.',
  },
  {
    key: 'updates',
    title: 'System Updates',
    description: 'Push new content notifications and announcements.',
  },
]

const emptyMediaCard = {
  id: '',
  title: '',
  description: '',
  buttonLabel: '',
}

const emptyMediaUpdate = {
  title: '',
  description: '',
  action: '',
}

export { MEDIA_GROUPS, emptyMediaCard, emptyMediaUpdate }
