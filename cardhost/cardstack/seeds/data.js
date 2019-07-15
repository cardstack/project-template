const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {

  // factory.addResource('card-names', 1).withAttributes({
  //     title: 'some-title',
  //   });
}


module.exports = factory.getModels();