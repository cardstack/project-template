/*
  This is saying that the app itself is also a data source.
  Specifically, it implements cardstack/static-model.js to emit the schemas for
  all the cards.
*/
module.exports = [
  {
    type: 'data-sources',
    id: 'card-static-models',
    attributes: {
      'source-type': 'cardhost'
    }
  }
];
