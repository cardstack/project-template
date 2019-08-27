const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'photos')

  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'description').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'url').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'comment').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

  ]);


  factory.addResource('grants', 'photo-world-read')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'photos' }
    ])
    .withRelated('fields', [
      {type: 'fields', id: 'title'},
      {type: 'fields', id: 'description'},
      {type: 'fields', id: 'url'},
    ])
    .withAttributes({
      'may-read-resource': true,
      'may-read-fields': true,
    });


factory.addResource('grants', 'admin-update')
  .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'photos' }
  ])
  .withRelated('fields', [
    {type: 'fields', id: 'comment'},
    
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

let models = factory.getModels();
module.exports = function() { return models; };