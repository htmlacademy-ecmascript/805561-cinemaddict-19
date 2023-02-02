import {getRandomInteger, getBoolean, getArrayRandomElements} from '../utils.js';

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generatePoster = () => {
  const poster = [
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/the-dance-of-life.jpg',
    'images/posters/the-great-flamarion.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg'
  ];

  const randomIndex = getRandomInteger(0, poster.length - 1);

  return poster[randomIndex];
};

const generateGenre = () => {
  const genre = [
    'Drama',
    'Film-Noir',
    'Mystery',
    'Comedy'
  ];
  const genres = getArrayRandomElements(genre);
  return genres;
};

const generateEmotion = () => {
  const emotion = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotion.length - 1);

  return emotion[randomIndex];
};

export const generateComment = () => ({
  id: getRandomInteger(1, 20),
  author: `Ilya O'Reilly-${getRandomInteger(1, 20)}`,
  comment: generateDescription(),
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateEmotion()
});


export const generateFilm = () => ({
  id: getRandomInteger(0, 30000000),
  comments: [ 1, 5, 7, 10, 15, 19],
  filmInfo: {
    title: `Title ${ getRandomInteger(0, 30)}`,
    alternativeTitle: `Alternative title ${ getRandomInteger(0, 30)}`,
    totalRating: getRandomInteger(0, 10),
    poster: generatePoster(),
    ageRating: getRandomInteger(0, 50),
    director: 'Tom Ford',
    writers: [ 'Takeshi Kitano', 'Kitano Takeshi' ],
    actors: [ 'Morgan Freeman' ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: '5h 55m',
    genre: generateGenre(),
    description: generateDescription()
  },
  userDetails: {
    watchlist: getBoolean(),
    alreadyWatched: getBoolean(),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: getBoolean(),
  }
});
