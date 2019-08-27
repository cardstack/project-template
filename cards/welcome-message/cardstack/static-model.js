const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'welcome-messages')
  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'message').withAttributes({
      fieldType: '@cardstack/core-types::string'
    })
  ]);

  factory.addResource('welcome-messages', 1).withAttributes({
    title: 'Welcome!',
    message: 'Get ready to build your first project with the Card SDK.'
  });

  factory.addResource('grants', 'welcome-message-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'welcome-messages' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

let models = factory.getModels();
module.exports = function() { return models; };
