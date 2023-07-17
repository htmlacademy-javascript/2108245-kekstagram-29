import {isEscapeKey} from '../utils/utils.js';
import {validateForm, addValidator, resetPristine} from './form-validate.js';
import {renderMessage} from './validate-messages.js';
import {setUpdateOptions, createSlider} from './photo-filters.js';
import {addPhotoScale, resetScale} from './photo-scale.js';
import {sendData} from '../api.js';

const POST_URL = 'https://29.javascript.pages.academy/kekstagra/';

const form = document.querySelector('.img-upload__form');
const imageInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');

const onEffectsListChange = (event) => setUpdateOptions(event.target.value);

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
  resetScale();
  resetPristine();
  setUpdateOptions(currentEffectValue);
};

function onOverlayCancelClick(event) {
  event.preventDefault();
  closeModal();
}

function onDocumentKeydown(event) {
  const textHashtags = event.target.closest('.text__hashtags');
  const textDescription = event.target.closest('.text__description');
  const errorContainer = document.querySelector('.error');

  if(isEscapeKey(event) && !textHashtags && !textDescription && !errorContainer) {
    event.preventDefault();
    closeModal();
  }
}

const success = () => {
  renderMessage('success');
};

const error = () => {
  renderMessage('error');
};

function onFormSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    submitButton.disabled = true;
    sendData(POST_URL, success, error, new FormData(event.target));
  }
  submitButton.disabled = false;
}

const onImageInputChange = () => openModal();

const initUploadForm = () => {
  addValidator();
  addPhotoScale();
  createSlider(currentEffectValue);
  imageInput.addEventListener('change', onImageInputChange);
  form.addEventListener('submit', onFormSubmit);
  overlayCancel.addEventListener('click', onOverlayCancelClick);
  effectsList.addEventListener('change', onEffectsListChange);
};

export {initUploadForm, closeModal};
