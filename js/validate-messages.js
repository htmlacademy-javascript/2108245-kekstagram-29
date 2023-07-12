import {isEscapeKey} from './utils.js';
import {closeModal} from './init-upload-form.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successContainer = successTemplate.cloneNode(true);
const errorContainer = errorTemplate.cloneNode(true);
const successButton = successContainer.querySelector('.success__button');
const errorButton = errorContainer.querySelector('.error__button');

const renderSuccessMessage = () => {
  document.body.append(successContainer);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  successContainer.addEventListener('click', onSuccessContainerClick);
};

const renderErrorMessage = () => {
  document.body.append(errorContainer);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  errorContainer.addEventListener('click', onErrorContainerClick);
};

const closeSuccessMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.body.classList.remove('modal-open');
  document.body.removeChild(successContainer);
  successContainer.removeEventListener('click', onSuccessContainerClick);
};

const closeErrorMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.body.classList.remove('modal-open');
  document.body.removeChild(errorContainer);
  errorContainer.removeEventListener('click', onErrorContainerClick);
};

function onSuccessButtonClick(event) {
  event.preventDefault();
  closeSuccessMessage();
  closeModal();
}

function onErrorButtonClick(event) {
  event.preventDefault();
  closeErrorMessage();
}

function onDocumentKeydown(event) {
  if(isEscapeKey(event)) {
    event.preventDefault();
    closeSuccessMessage();
  }
}

function onSuccessContainerClick(event) {
  if(!event.target.closest('.success-inner')) {
    closeSuccessMessage();
    closeModal();
  }
}

function onErrorContainerClick(event) {
  if(!event.target.closest('.error-inner')) {
    closeErrorMessage();
  }
}

export {renderErrorMessage, renderSuccessMessage};
