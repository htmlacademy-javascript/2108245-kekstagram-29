import {renderPosts} from './render-posts.js';
import {initFilter, getFilteringData} from './filter.js';
import {getData} from '../utils/api.js';
import {renderMessage} from '../upload/validate-messages.js';

const GET_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_STATE = 'error';
const ERROR_MESSAGE = 'Ошибка. Обновите страницу';

const showError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE);
};

const getSuccess = (data) => {
  initFilter(data);
  renderPosts(getFilteringData(data));
};

const initPosts = () => getData(GET_URL, getSuccess, showError);

export {initPosts};
