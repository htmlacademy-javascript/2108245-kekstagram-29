import {isEscapeKey} from './utils.js';

const pictureContainer = document.querySelector('.big-picture');
const pictureCancel = pictureContainer.querySelector('.big-picture__cancel');
const bigImage = pictureContainer.querySelector('img');
const likesCount = pictureContainer.querySelector('.likes-count');
const commentsCount = pictureContainer.querySelector('.comments-count');
const socialComments = pictureContainer.querySelector('.social__comments');
const socialComment = pictureContainer.querySelector('.social__comment');
const socialCaption = pictureContainer.querySelector('.social__caption');

const openModal = () => {
  pictureContainer.classList.remove('hidden');
  pictureCancel.addEventListener('click', onPictureCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
};

function closeModal () {
  pictureContainer.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancel.removeEventListener('click', onPictureCancelClick);
  document.body.classList.remove('modal-open');
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

const fillBigPicture = (post) => {
  bigImage.src = post.url;
  socialCaption.textContent = post.description;
  commentsCount.textContent = post.comments.length;
  likesCount.textContent = post.likes;
};

const fillComment = (item) => {
  const comment = socialComment.cloneNode(true);
  const img = comment.querySelector('.social__picture');
  img.src = item.avatar;
  img.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  socialComments.append(comment);
};

const fillComments = (comments) => {
  comments.forEach((item) => fillComment(item));
};

const renderBigPost = (post) => {
  socialComments.innerHTML = '';
  openModal();
  fillBigPicture(post);
  fillComments(post.comments);
};

export {renderBigPost};
