const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'scorecards')
.withAttributes({
  defaultIncludes: ['photos', 'aphoto'],
  fieldsets: {
    isolated: [
      {field: 'photos', format: 'embedded'},
      {field: 'aphoto', format: 'embedded'}
    ]
  }
})
  .withRelated('fields', [
    factory.addResource('fields', 'score').withAttributes({
      fieldType: '@cardstack/core-types::integer'
    }),

    // factory.addResource('fields', 'comment').withAttributes({
    //   fieldType: '@cardstack/core-types::string'
    // }),

    factory.addResource('fields', 'aphoto').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to',
      editorComponent: 'field-editors/dropdown-search-editor',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'photos' }]),
  ]);

  factory.addResource('grants', 'scorecard-world-read-resource')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'scorecards' }
  ])
  .withAttributes({
    'may-read-resource': true,
  });

  factory.addResource('grants', 'scorecard-world-read-fields')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('fields', [
    { type: 'fields', id: 'score' },
    { type: 'fields', id: 'aphoto' }
  ])
  .withAttributes({
    'may-read-fields': true,
  });

  factory.addResource('grants', 'scorecard-writers-update-resource')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'scorecards' }
    ])
    .withAttributes({
      'may-create-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
    });

  factory.addResource('grants', 'scorecard-writers-update-fields')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('fields', [
      { type: 'fields', id: 'score' },
      { type: 'fields', id: 'aphoto' }
    ])
    .withAttributes({
      'may-write-fields': true
    });

let models = factory.getModels();
module.exports = function() { return models; };