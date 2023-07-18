import {renderPosts} from './render-posts.js';
import {shuffleArray, debounce} from '../utils/utils.js';

const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const POSTS_COUNT = 10;
const RENDER_DELAY = 500;

const filter = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const pictureList = document.querySelector('.pictures');

const getFilteringData = (data, id = '') => {
  switch (id) {
    case FILTER_RANDOM:
      return shuffleArray(data.slice()).slice(0, POSTS_COUNT);

    case FILTER_DISCUSSED:
      return data.slice().sort((a, b) => b.comments.length - a.comments.length);

    default:
      return data;
  }
};

const removePictures = () => {
  pictureList.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const setDelayRender = debounce((data, id) => {
  removePictures();
  renderPosts(getFilteringData(data, id));
}, RENDER_DELAY);

const setInactiveButton = () => {
  const buttonActive = imgFiltersForm.querySelector('.img-filters__button--active');
  buttonActive.classList.remove('img-filters__button--active');
};

const initFilter = (data) => {
  filter.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.closest('.img-filters__button')) {
      setInactiveButton();
      event.target.classList.add('img-filters__button--active');
      const id = event.target.id;
      setDelayRender(data, id);
    }
  });
};

export {initFilter, getFilteringData};
