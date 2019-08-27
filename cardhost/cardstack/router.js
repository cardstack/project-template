module.exports = [{
  path: '/:type/:id',
  query: {
    filter: {
      type: { exact: ':type' },
      id: { exact: ':id' }
    }
  },
},{
  // edit this to change the card that is shown at at the index route
  path: '/',
  query: {
    filter: {
      type: { exact: 'welcome-messages' },
      id: { exact: '1' }
    }
  },
}];
