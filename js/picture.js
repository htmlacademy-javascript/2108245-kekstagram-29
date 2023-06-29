import {createPosts} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createPosts();

const listFragment = document.createDocumentFragment();

const createPost = (item) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = item.url;
  img.alt = item.description;
  picture.querySelector('.picture__likes').textContent = item.likes;
  picture.querySelector('.picture__comments').textContent = item.comments.length;
  listFragment.appendChild(picture);
};

const renderPosts = () => {
  pictures.forEach((picture) => createPost(picture));
  pictureList.appendChild(listFragment);
};

export {renderPosts};
