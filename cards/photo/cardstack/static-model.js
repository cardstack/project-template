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

  factory.addResource('grants', 'photo-resource-read')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      {type: 'content-types', id: 'photos'},
    ])
    .withAttributes({
      'may-read-resource': true,
    });
  
  factory.addResource('grants', 'photo-field-read')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('fields', [
      {type: 'fields', id: 'photo-title'},
      {type: 'fields', id: 'photographer'},
      {type: 'fields', id: 'image-url'},
      {type: 'fields', id: 'alt-text'},
    ])
    .withAttributes({
      'may-read-fields': true,
    });
  
  
  factory.addResource('grants', 'commenter-resource-update')
    .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
    .withRelated('types', [
      {type: 'content-types', id: 'photos'},
    ])
    .withAttributes({
      'may-update-resource': true,
    });
  
  factory.addResource('grants', 'commenter-field-update')
    .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
    .withRelated('fields', [
      {type: 'fields', id: 'comment'} 
    ])
    .withAttributes({
      'may-read-fields': true,
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };