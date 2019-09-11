const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {

  factory.addResource('movies', 1).withAttributes({
    title: 'Avengers Endgame',
    year: 2019,
    genre: 'Adventure',
    summary: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
    playing: true,
    notes: ''
  });
  factory.addResource('movies', 2).withAttributes({
    title: 'Spiderman: Far From Home',
    year: 2019,
    genre: 'Sci-Fi',
    summary: 'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats in a world that has changed forever.',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 3).withAttributes({
    title: 'Thor Ragnarok',
    year: 2017,
    genre: 'Comedy',
    summary: 'Thor (Chris Hemsworth) is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela (Cate Blanchett).',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 4).withAttributes({
    title: 'Doctor Strange',
    year: 2016,
    genre: 'Fantasy',
    summary: 'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 5).withAttributes({
    title: 'Black Widow',
    year: 2020,
    genre: 'Horror',
    summary: 'Not announced',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 6).withAttributes({
    title: 'Iron Man',
    year: 2008,
    genre: 'Other',
    summary: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 7).withAttributes({
    title: 'Captain America Civil War',
    year: 2016,
    genre: 'Action',
    summary: 'Political involvement in the Avengers affairs causes a rift between Captain America and Iron Man.',
    playing: false,
    notes: ''
  });
  factory.addResource('movies', 8).withAttributes({
    title: 'Guardians of the Galaxy Vol. 3',
    year: 2020,
    genre: 'Comedy',
    summary: 'Not announced',
    playing: false,
    notes: ''
  });
  factory.addResource('main-boards', 'main').withAttributes({
    title: 'Personal Movie Tracker',
    message: 'Please choose which category to view'
  })
  .withRelated('watched-movies', [
    { type: 'movies', id: '1' },
    { type: 'movies', id: '2' },
  ])
  .withRelated('currently-watching-movies', [
    { type: 'movies', id: '3' },
    { type: 'movies', id: '4' },
  ])
  .withRelated('to-watch-movies', [
    { type: 'movies', id: '5' },
    { type: 'movies', id: '6' },
  ]);

/*
Seed data defined here will be available in the
ephemeral data source.
*/

  // factory.addResource('card-names', 1).withAttributes({
  //     title: 'some-title',
  //   });

}


module.exports = factory.getModels();