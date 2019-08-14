const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {

/*
Seed data defined here will be available in the
ephemeral data source.
*/

  // factory.addResource('card-names', 1).withAttributes({
  //     title: 'some-title',
  //   });
}


module.exports = factory.getModels();