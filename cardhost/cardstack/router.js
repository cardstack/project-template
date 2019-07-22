module.exports = [{
  path: '/:type/:id',
  query: {
    filter: {
      type: { exact: ':type' },
      id: { exact: ':id' }
    }
  },
},{
  path: '/',
  query: {
    filter: {
      type: { exact: 'main-boards' },
      id: { exact: 'main' }
    }
  },
}];