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
    title: 'Welcome to the Card SDK!',
    message: 'To edit or remove this welcome card, see cards/welcome-message and cardhost/cardstack/router.js'
  });

  factory.addResource("grants")
    .withRelated("who", [{ type: "groups", id: "everyone" }])
    .withRelated("types", [{ type: 'content-types', id: 'welcome-messages' }])
    .withAttributes({
      "may-read-resource": true,
      "may-read-fields": true
    });

let models = factory.getModels();
module.exports = function() { return models; };
