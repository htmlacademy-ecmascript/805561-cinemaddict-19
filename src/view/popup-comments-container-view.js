import {humanizeDate} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import CommentModel from '../model/comment-model';


let commentEmoji = null;

const createPopupCommentsContainerTemplate = ({film, commentsData, emoji}) => {

  const {
    comments,
  } = film;
  let commentCount = 0;

  const fragment = new DocumentFragment();
  const renderCommentList = () => {
    comments.forEach((commentId) => {
      const currentComment = commentsData.find((item) => item.id === commentId);
      //console.log(currentComment);

      if(currentComment){
        const {id, author, comment, date, emotion} = currentComment;
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
              <button class="film-details__comment-delete" data-id="${id}">Delete</button>
            </p>
          </div>
        </li>`;
        fragment.append(listItem);
        commentCount++;
      }
    });

    return fragment.textContent;
  };
  const commentsList = renderCommentList();

  commentEmoji = emoji;

  return (
    `
    <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

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

  #commentModel = new CommentModel();
  #commentsData = this.#commentModel.comments;

  #film = null;
  //#comments = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  constructor({commentContainerData, onFormSubmit, onDeleteClick}) {
    super();
    const {film} = commentContainerData;
    this.#film = film;
    //this.#comments = comments;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._setState(PopupCommentsContainerView.parseCommentToState(commentContainerData));

    this._restoreHandlers();
  }

  get template() {
    //return createPopupCommentsContainerTemplate(this.#film, this.#comments, );
    console.log(this._state.commentsData);
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
    this.element.querySelector('.film-details__new-comment').addEventListener('submit', this.#commentSendHandler);

    this.element.querySelectorAll('.film-details__comment-delete')
      .forEach((item) =>{
        item.addEventListener('click', this.#commentDeleteClickHandler);
      });
  }

  #commentSendHandler = () => {
    //что-то тут при отправке коммента, типа
    this.#handleFormSubmit();
    //PopupCommentsContainerView.parseStateToComment(this._state);
  };

  #emojiItemClickHandler = (evt) => {
    commentEmoji = evt.target.value;

    this.updateElement({
      emoji: commentEmoji,
    });

  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(evt.target.dataset.id);
    const newCommentData = (this._state.commentsData).slice().filter((item) =>
      Number(item.id) !== Number(evt.target.dataset.id)
    );

    this.updateElement(
      this._state.commentsData = newCommentData
    );
    //console.log(PopupCommentsContainerView.parseStateToComments(this._state));
    //this.#handleDeleteClick(PopupCommentsContainerView.parseStateToComments(this._state));
  };

  static parseCommentToState(commentContainerData) {
    return {...structuredClone(commentContainerData),
      emoji: commentEmoji,
    };
  }

  static parseStateToComments(state) {
    //const commentContainerData = {...state };
    const commentContainerData = structuredClone(state);

    if (!commentContainerData.emoji) {
      commentContainerData.emoji = null;
    }

    delete commentContainerData.emoji;

    return commentContainerData;
  }

}
