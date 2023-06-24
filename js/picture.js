import {createPosts} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = createPosts();

const listFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  pictureList.appendChild(picture);
});

pictureList.appendChild(listFragment);
