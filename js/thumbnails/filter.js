import {renderPosts} from './render-posts.js';
import {shuffleArray} from '../utils/utils.js';

const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const filter = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const pictureList = document.querySelector('.pictures');

//switch case
const getFilteringData = (data, id = '') => {
  if (!id || id === FILTER_DEFAULT) {
    return data;
  }

  if (id === FILTER_RANDOM) {
    return shuffleArray(data.slice()).slice(0, 10);
  }

  if (id === FILTER_DISCUSSED) {
    return data.slice().sort((a, b) => a.comments.length - b.comments.length);
  }
};

const removePictures = () => {
  pictureList.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

const initFilter = (data) => {
  filter.classList.remove('img-filters--inactive');
  imgFiltersForm.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.closest('.img-filters__button')) {
      const id = event.target.id;
      removePictures();
      renderPosts(getFilteringData(data, id));
    }
  });
};

export {initFilter, getFilteringData};
