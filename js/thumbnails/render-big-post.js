import {isEscapeKey} from '../utils/utils.js';

const COMMENTS_COUNTER = 5;

const pictureContainer = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
const bigImage = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');

let comments = [];
let visibleComments = 0;

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  pictureCancel.addEventListener('click', onPictureCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

function closeModal () {
  pictureContainer.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancel.removeEventListener('click', onPictureCancelClick);
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsLoader.classList.remove('hidden');
  comments = [];
  visibleComments = 0;
}

function onPictureCancelClick(event) {
  event.preventDefault();
  closeModal();
}

function onDocumentKeydown(event) {
  if(isEscapeKey(event) && !event.target.closest('.social__footer-text')) {
    event.preventDefault();
    closeModal();
  }
}

const fillCommentCounter = () => {
  socialCommentCount.innerHTML = `${visibleComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const fillComment = (item) => {
  const comment = socialComment.cloneNode(true);
  const img = comment.querySelector('.social__picture');
  img.src = item.avatar;
  img.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  return comment;
};

const setStatusButton = () => {
  if (visibleComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    return;
  }

  commentsLoader.classList.remove('.hidden');
};

const fillComments = () => {
  const currentComments = comments.slice(visibleComments, visibleComments + COMMENTS_COUNTER);
  visibleComments = Math.min(visibleComments + COMMENTS_COUNTER, comments.length);
  currentComments.forEach((comment) => socialComments.append(fillComment(comment)));
  fillCommentCounter();
  setStatusButton();
};

function onCommentsLoaderClick(event) {
  event.preventDefault();
  fillComments();
}

const fillBigPicture = (post) => {
  bigImage.src = post.url;
  console.log(bigImage.src)
  bigImage.alt = post.description;
  socialCaption.textContent = post.description;
  likesCount.textContent = post.likes;
};

const renderBigPost = (post) => {
  socialComments.innerHTML = '';
  comments = post.comments;
  openModal();
  fillBigPicture(post);
  fillComments();
};

export {renderBigPost};
