const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {

/*
Seed data defined here will be available in the
ephemeral data source.
*/

  factory.addResource('photos', 1).withAttributes({
    'photo-title': 'Moraine Lake, Canada',
    'photographer': 'John Lee',
    'image-url': '/images/moraine-lake-john-lee.jpg',
    'alt-text': 'a serene lake in the summer surrounded by trees and mountains',
    'comment': 'This should be a frontrunner'
  });
}


module.exports = factory.getModels();