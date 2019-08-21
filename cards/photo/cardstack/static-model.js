const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'photos')
  // .withAttributes({
  //   defaultIncludes: ['scorecards'],
  //   fieldsets: {
  //     isolated: [
  //       {field: 'scorecards', format: 'embedded'}
  //     ]
  //   }
  // })
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

    factory.addResource('fields', 'scorecards').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'scorecards' }]),
  ]);

let models = factory.getModels();
module.exports = function() { return models; };