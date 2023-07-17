import {renderBigPost} from './render-big-post.js';
import {showAlert} from '../utils/utils.js';
import {getData} from '../api.js';


const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить данные. Попробуйте обновить страницу';
const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const listFragment = document.createDocumentFragment();

const createPost = (item) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  img.src = item.url;
  img.alt = item.description;
  picture.id = item.id;
  picture.querySelector('.picture__likes').textContent = item.likes;
  picture.querySelector('.picture__comments').textContent = item.comments.length;
  picture.addEventListener('click', (event) => {
    event.preventDefault();
    renderBigPost(item);
  });
  listFragment.appendChild(picture);
};

const createPosts = (posts) => {
  posts.forEach((post) => createPost(post));
  pictureList.appendChild(listFragment);
};

const showError = () => {
  showAlert(ALERT_MESSAGE, ALERT_SHOW_TIME);
};

const renderPosts = () => {
  getData(GET_URL, (posts) => createPosts(posts), showError);
};

export {renderPosts};
