import {isEscapeKey} from '../utils/utils.js';
import {validateForm, addValidator, resetPristine} from './form-validate.js';
import {renderSuccessMessage, renderErrorMessage} from './validate-messages.js';
import {setUpdateOptions, createSlider} from './photo-filters.js';
import {addPhotoScale, resetScale} from './photo-scale.js';

const form = document.querySelector('.img-upload__form');
const imageInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const overlayCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;

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
  const errorContainer = event.target.closest('.error__inner');
  if(isEscapeKey(event) && !textHashtags && !textDescription && !errorContainer) {
    event.preventDefault();
    closeModal();
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (validateForm()) {
    renderSuccessMessage();
    return;
  }
  renderErrorMessage();
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
