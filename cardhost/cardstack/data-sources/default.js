let sources = [
  {
    type: 'plugin-configs',
    id: '@cardstack/hub',
    attributes: {
      'plugin-config': {
        'application-card': { type: 'app-cards', id: 'cardhost' }
      }
    },
    relationships: {
      'default-data-source': {
        data: { type: 'data-sources', id: 'default' }
      }
    }
  },
  {
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/git',
      params: {
        remote: {
          url: 'git@github.com:jenweber/project-data.git',
          privateKey: process.env.GIT_PRIVATE_KEY,
        }
      }
    }
  }
];

/*
If a Card should use different data sources when the
environment is production vs development or testing,
you could use something like the example below.
*/

// if (process.env.HUB_ENVIRONMENT === 'production') {
//   sources.push({...})
// } else {
//   sources.push({...})
// }

module.exports = sources;
