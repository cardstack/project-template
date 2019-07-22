const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'movies')
  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string',
    }),
    factory.addResource('fields', 'year').withAttributes({
      fieldType: '@cardstack/core-types::integer'
    }),
    factory.addResource('fields', 'genre').withAttributes({
      fieldType: '@cardstack/core-types::string',
    }),
    factory.addResource('fields', 'summary').withAttributes({
      fieldType: '@cardstack/core-types::string',
    }),
    factory.addResource('fields', 'playing').withAttributes({
      fieldType: '@cardstack/core-types::boolean'
    }),
    factory.addResource('fields', 'notes').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

  factory.addResource('grants', 'movie-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'movies' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants', 'movie-writers-update')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'movies' }
  ])
  .withAttributes({
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

let models = factory.getModels();
module.exports = function() { return models; };