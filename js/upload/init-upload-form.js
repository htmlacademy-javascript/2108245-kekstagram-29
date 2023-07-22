import { isEscapeKey } from '../utils/utils.js';
import { validateForm, addValidator, resetPristine } from './form-validate.js';
import { renderMessage } from '../utils/messages.js';
import { setUpdateOptions, createSlider } from './photo-filters.js';
import { addPhotoScale, resetScale } from './photo-scale.js';
import { sendData } from '../utils/api.js';
import { renderUploadImage } from './upload-image.js';

const POST_URL = 'https://29.javascript.pages.academy/kekstagram/';
const SUCCESS_STATE = 'success';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const SUCCESS_BUTTON_TEXT = 'Круто!';
const ERROR_STATE = 'error';
const ERROR_MESSAGE = 'Ошибка загрузки файла';
const ERROR_BUTTON_TEXT = 'Попробовать ещё раз';

const form = document.querySelector('.img-upload__form');
const imageInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');

const setSubmitButtonStatus = (state) => {
  submitButton.disabled = state;
};

const onEffectsListChange = (event) => setUpdateOptions(event.target.value);

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  form.reset();
  resetPristine();
  resetScale();
  setUpdateOptions(currentEffectValue);
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOverlayCancelClick = (event) => {
  event.preventDefault();
  closeModal();
};

function onDocumentKeydown(event) {
  const textHashtags = event.target.closest('.text__hashtags');
  const textDescription = event.target.closest('.text__description');
  const errorContainer = document.querySelector('.error');

  if (
    isEscapeKey(event) &&
    !textHashtags &&
    !textDescription &&
    !errorContainer
  ) {
    event.preventDefault();
    closeModal();
  }
}

const onSuccess = () => {
  closeModal();
  renderMessage(SUCCESS_STATE, SUCCESS_MESSAGE, SUCCESS_BUTTON_TEXT);
  setSubmitButtonStatus(false);
};

const onError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE, ERROR_BUTTON_TEXT);
  setSubmitButtonStatus(false);
};

function onFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    setSubmitButtonStatus(true);
    sendData(POST_URL, onSuccess, onError, new FormData(event.target));
  }
}

const onImageInputChange = (event) => {
  renderUploadImage(event);
  openModal();
};

const initUploadForm = () => {
  addValidator();
  addPhotoScale();
  createSlider(currentEffectValue);
  imageInput.addEventListener('change', onImageInputChange);
  form.addEventListener('submit', onFormSubmit);
  overlayCancel.addEventListener('click', onOverlayCancelClick);
  effectsList.addEventListener('change', onEffectsListChange);
};

export { initUploadForm };
