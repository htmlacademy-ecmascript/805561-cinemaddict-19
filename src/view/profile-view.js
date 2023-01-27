import AbstractView from '../framework/view/abstract-view';

const createProfiletTemplate = (favoriteCount) => {
  const favoriteCountValue = favoriteCount;
  let profileRating;

  //стоит ли здесь использовать switch, или лучше не выпендриваться и через if?
  switch(true) {
    case favoriteCountValue > 0 && favoriteCountValue <= 10:
      profileRating = 'Novice';
      break;
    case favoriteCountValue >= 11 && favoriteCountValue <= 20:
      profileRating = 'Fan';
      break;
    case favoriteCountValue >= 21:
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
  #favoriteCount = null;

  constructor(favoriteCount) {
    super();
    this.#favoriteCount = favoriteCount;
  }

  get template() {
    return createProfiletTemplate(this.#favoriteCount);
  }
}
