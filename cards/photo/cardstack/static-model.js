const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

factory.addResource('content-types', 'photos')
  .withRelated('fields', [
    factory.addResource('fields', 'photo-title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'photographer').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'image-url').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'alt-text').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'comment').withAttributes({
      fieldType: '@cardstack/core-types::string'
    })
  ]);

  factory.addResource('grants', 'photo-world-read')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'photos' }
    ])
    .withAttributes({
      'may-read-resource': true,
      'may-read-fields': true,
    });

  factory.addResource('grants', 'photo-admin-update')
    .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
    .withRelated('types', [
      { type: 'content-types', id: 'photos' }
    ])
    .withAttributes({
      'may-create-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };