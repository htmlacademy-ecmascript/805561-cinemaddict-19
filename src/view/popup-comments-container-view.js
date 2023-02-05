import {humanizeDate} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';


let commentEmoji = null;

const createPopupCommentsContainerTemplate = ({film, commentsData, emoji}) => {

  const {
    comments,
  } = film;

  const fragment = new DocumentFragment();
  const renderCommentList = () => {
    comments.forEach((commentId) => {
      const {author, comment, date, emotion} = commentsData[commentId];
      const template = 'YYYY/MM/DD hh:mm';
      const humanizedDate = date !== null
        ? humanizeDate(date, template)
        : '';
      const listItem =
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${humanizedDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`;
      fragment.append(listItem);
    });

    return fragment.textContent;
  };
  const commentsList = renderCommentList();

  commentEmoji = emoji;

  return (
    `
    <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsList}
      </ul>

      <form class="film-details__new-comment"  action="" method="get">
        <div class="film-details__add-emoji-label">
             ${commentEmoji ? `<img src="images/emoji/${commentEmoji}.png" width="55" height="55" alt="emoji-smile">` : ''}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </form>
    </section>
    </div>
    `
  );
};

export default class PopupCommentsContainerView extends AbstractStatefulView {

  //#film = null;
  //#comments = null;

  constructor(commentContainerData) {
    super();
    //const {film, comments} = commentContainerData;
    //this.#film = film;
    //this.#comments = comments;
    this._setState(PopupCommentsContainerView.parseCommentToState(commentContainerData));

    this._restoreHandlers();
  }

  get template() {
    //return createPopupCommentsContainerTemplate(this.#film, this.#comments, );
    return createPopupCommentsContainerTemplate(this._state );
  }

  _restoreHandlers() {
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((item) =>{
        item.addEventListener('click', this.#emojiItemClickHandler);
        if(commentEmoji === item.value){
          item.setAttribute('checked', true);
        }
      });

    //функция отправки комментария по Ctrl/Command + Enter
  }

  #commentSendHandler = () => {
    //что-то тут при отправке коммента, типа
    //PopupCommentsContainerView.parseStateToComment(this._state);
  };

  #emojiItemClickHandler = (evt) => {
    commentEmoji = evt.target.value;

    this.updateElement({
      emoji: commentEmoji,
    });

  };

  static parseCommentToState(commentContainerData) {
    return {...commentContainerData,
      emoji: commentEmoji,
    };
  }

  static parseStateToComment(state) {
    const commentContainerData = {...state };

    if (!commentContainerData.emoji) {
      commentContainerData.emoji = null;
    }

    delete commentContainerData.emoji;

    return commentContainerData;
  }

}
