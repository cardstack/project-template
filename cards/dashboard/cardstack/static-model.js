const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'dashboards')
  .withAttributes({
    defaultIncludes: ['scorecards'],
    fieldsets: {
      isolated: [
        {field: 'scorecards', format: 'embedded'}
      ]
    }
  })
  .withRelated('fields', [
    factory.addResource('fields', 'heading').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'photos').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'photos' }]),

    factory.addResource('fields', 'scorecards').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'scorecards' }]),
  ]);

let models = factory.getModels();
module.exports = function() { return models; };