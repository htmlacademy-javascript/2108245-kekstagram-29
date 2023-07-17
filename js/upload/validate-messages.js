import {isEscapeKey} from '../utils/utils.js';
import {closeModal} from './init-upload-form.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
let messageContainer, submitButton;

const cloneMessageContainer = (type) => {
  if (type === 'success') {
    messageContainer = successTemplate.cloneNode(true);
    submitButton = messageContainer.querySelector('.success__button');
    return;
  }
  messageContainer = errorTemplate.cloneNode(true);
  submitButton = messageContainer.querySelector('.error__button');
};

const removeMessageContainer = () => {
  messageContainer = '';
  submitButton = '';
};

const renderMessage = (type) => {
  cloneMessageContainer(type);
  document.body.append(messageContainer);
  submitButton.addEventListener('click', onSubmitButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  messageContainer.addEventListener('click', onMessageContainerClick);
};

const closeMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  submitButton.removeEventListener('click', onSubmitButtonClick);
  document.body.classList.remove('modal-open');
  document.body.removeChild(messageContainer);
  messageContainer.removeEventListener('click', onMessageContainerClick);
  removeMessageContainer();
};

function onSubmitButtonClick(event) {
  event.preventDefault();
  if (submitButton.classList.contains('success__button')) {
    closeModal();
  }
  closeMessage();
}

function onDocumentKeydown(event) {
  if(isEscapeKey(event)) {
    event.preventDefault();
    if (submitButton.classList.contains('success__button')) {
      closeModal();
    }
    closeMessage();
  }
}

function onMessageContainerClick(event) {
  if(!event.target.closest('.success-inner') && submitButton.classList.contains('success__button')) {
    closeMessage();
    closeModal();
    return;
  }
  if(!event.target.closest('.error-inner') && submitButton.classList.contains('error__button')) {
    closeMessage();
  }
}

export {renderMessage};
