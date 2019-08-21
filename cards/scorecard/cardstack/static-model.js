const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'scorecards')
.withAttributes({
  defaultIncludes: ['photos'],
  fieldsets: {
    isolated: [
      {field: 'photos', format: 'embedded'}
    ]
  }
})
  .withRelated('fields', [
    factory.addResource('fields', 'score').withAttributes({
      fieldType: '@cardstack/core-types::integer'
    }),

    factory.addResource('fields', 'comment').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    // factory.addResource('fields', 'photo').withAttributes({
    //   fieldType: '@cardstack/core-types::belongs-to',
    //   editorComponent: 'field-editors/dropdown-search-multi-select-editor',
    // })
    // .withRelated('related-types', [{ type: 'content-types', id: 'photos' }]),
  ]);

  factory.addResource('grants', 'scorecard-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'scorecards' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

  factory.addResource('grants', 'scorecard-writers-update')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'scorecards' }
    ])
    .withAttributes({
      'may-create-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };