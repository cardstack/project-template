const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'dashboards')
  .withAttributes({
    defaultIncludes: ['photos'],
    fieldsets: {
      isolated: [
        {field: 'photos', format: 'embedded'}
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

    factory.addResource('fields', 'photos').withAttributes({
      fieldType: '@cardstack/core-types::has-many',
      editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'photos' }]),
  ]);

  factory.addResource('grants', 'dashboard-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'dashboards' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

  factory.addResource('grants', 'dashboard-writers-update')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'dashboards' }
    ])
    .withAttributes({
      'may-create-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };