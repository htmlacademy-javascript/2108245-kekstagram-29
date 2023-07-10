import {isEscapeKey} from './utils.js';
import {validateForm, addValidator, resetPristine} from './form_validate.js';
import {renderSuccessMessage, renderErrorMessage} from './validate_messages.js';
import {addPhotoFilters, removeSlider, onEffectsListClick, createSlider} from './photo-filters.js';
import {addPhotoScale} from './photo-scale.js';

const form = document.querySelector('.img-upload__form');
const imageInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const overlayCancel = form.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects');

const openModal = () => {
  overlay.classList.remove('hidden');
  overlayCancel.addEventListener('click', onOverlayCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  addValidator();
  addPhotoScale();
  addPhotoFilters();
  form.addEventListener('submit', onFormSubmit);
  createSlider();
};

const closeModal = () => {
  removeSlider();
  form.reset();
  resetPristine();
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  overlayCancel.removeEventListener('click', onOverlayCancelClick);
  document.body.classList.remove('modal-open');
  effectsList.removeEventListener('click', onEffectsListClick);
};

function onOverlayCancelClick(event) {
  event.preventDefault();
  closeModal();
}

function onDocumentKeydown(event) {
  const textHashtags = event.target.closest('.text__hashtags');
  const textDescription = event.target.closest('.text__description');
  const errorContainer = event.target.closest('.error__inner');
  if(isEscapeKey(event) && !textHashtags && !textDescription && !errorContainer) {
    event.preventDefault();
    closeModal();
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    return renderSuccessMessage();
  }
  renderErrorMessage();
}

const onImageInputChange = () => {
  openModal();
};

const openForm = () => {
  imageInput.addEventListener('change', onImageInputChange);
};

export {openForm, closeModal};
