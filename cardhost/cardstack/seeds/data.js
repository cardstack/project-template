const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {

/*
Seed data defined here will be available in the
ephemeral data source.
*/

  factory.addResource('dashboards', 1).withAttributes({
      heading: 'Dashboard heading',
    });

    factory.addResource('photos', 1).withAttributes({
      "photo-title": 'My title 1',
      comment: 'only for admins'
    });
}


module.exports = factory.getModels();