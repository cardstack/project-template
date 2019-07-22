const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'main-boards')
  .withAttributes({
    defaultIncludes: ['movies', 'to-watch-movies','currently-watching-movies','watched-movies'],
    fieldsets: {
      isolated: [
        {field: 'movies', format: 'embedded'},
        {field: 'to-watch-movies', format: 'embedded'},
        {field: 'currently-watching-movies', format: 'embedded'},
        {field: 'watched-movies', format: 'embedded'}
      ]
    }
  })
  .withRelated('fields', [
    {type: 'fields', id: 'title'},
    factory.addResource('fields', 'message').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'watched-movies').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'movies' }]),

    factory.addResource('fields', 'currently-watching-movies').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'movies' }]),

    factory.addResource('fields', 'to-watch-movies').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'movies' }]),
  ]);
  factory.addResource('grants', 'main-board-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'main-boards' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

  factory.addResource('grants', 'main-board-writers-update')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'main-boards' }
    ])
    .withAttributes({
      'may-create-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };