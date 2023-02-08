import AbstractView from '../framework/view/abstract-view';

const createProfiletTemplate = (favoriteCount) => {
  const favoriteCountValue = favoriteCount;
  const Rating = {
    NOVICE_VALUE_MIN: 0,
    NOVICE_VALUE_MAX: 10,
    FAN_VALUE_MIN: 11,
    FAN_VALUE_MAX: 20,
    MOVIE_BUFF_VALUE_MIN: 21,
  };
  let profileRating;

  switch(true) {
    case favoriteCountValue > Rating.NOVICE_VALUE_MIN && favoriteCountValue <= Rating.NOVICE_VALUE_MAX:
      profileRating = 'Novice';
      break;
    case favoriteCountValue >= Rating.FAN_VALUE_MIN && favoriteCountValue <= Rating.FAN_VALUE_MAX:
      profileRating = 'Fan';
      break;
    case favoriteCountValue >= Rating.MOVIE_BUFF_VALUE_MIN:
      profileRating = 'Movie Buff';
      break;
    default:
      return '<section class="header__profile profile"> </section>';
  }

  return ` <section class="header__profile profile">
        <p class="profile__rating">${profileRating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class ProfileView extends AbstractView {
  #watchedCount = null;

  constructor(watchedCount) {
    super();
    this.#watchedCount = watchedCount;
  }

  get template() {
    return createProfiletTemplate(this.#watchedCount);
  }
}
