import {isEscapeKey} from '../utils/utils.js';

const createMessageTemplate = (state, message, buttonText) =>
  `<section class="${state}">
      <div class="${state}__inner">
          <h2 class="${state}__title">${message}</h2>
          ${buttonText ? `<button type="button" class="${state}__button">${buttonText}</button>` : ''}
      </div>
    </section>`;

let element, submitButton;

const createDomElement = (state, message, buttonText) => {
  document.body.insertAdjacentHTML('beforeend', createMessageTemplate(state, message, buttonText));
  element = document.querySelector(`.${state}`);
};

const initSubmitButton = (state, buttonText) => {
  if (buttonText) {
    submitButton = element.querySelector(`.${state}__button`);
    submitButton.addEventListener('click', onSubmitButtonClick);
  }
};

const renderMessage = (state, message, buttonText) => {
  createDomElement(state, message, buttonText);
  initSubmitButton(state, buttonText);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  element.addEventListener('click', onMessageContainerClick);
};

const removeMessageContainer = () => {
  document.body.removeChild(element);
  element = '';
  submitButton = '';
};

const closeMessage = () => {
  if (submitButton) {
    submitButton.removeEventListener('click', onSubmitButtonClick);
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  element.removeEventListener('click', onMessageContainerClick);
  removeMessageContainer();
};

function onSubmitButtonClick(event) {
  event.preventDefault();
  closeMessage();
}

function onDocumentKeydown(event) {
  if(isEscapeKey(event)) {
    event.preventDefault();
    closeMessage();
  }
}

function onMessageContainerClick(event) {
  if(!event.target.closest('.success__inner') && !event.target.closest('.error__inner')) {
    closeMessage();
  }
}

export {renderMessage};
