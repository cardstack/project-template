const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'photographers')
  .withRelated('fields', [
    factory.addResource('fields', 'name').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'biography').withAttributes({
      fieldType: '@cardstack/core-types::string'
    })
  ]);

// this is the seed data
factory.addResource('photographers', 1).withAttributes({
  name: 'Dorothea Lange',
  biography: "Known for her role in the development of documentary photography."
});

let models = factory.getModels();
module.exports = function() { return models; };