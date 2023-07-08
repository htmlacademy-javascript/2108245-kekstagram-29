const HASHTAG_GRAMMAR_RULES = /^#[a-za-яё0-9]{1,19}$/i;
const DESCRIPTION_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const INVALID_HASHTAG_NAME = 'Хеш-тег начинается с #, длиной не более 20 символов и может состоять только из букв и цифр';
const INVALID_HASHTAG_REPEAT = 'Хеш-теги не должны повторяться';
const INVALID_HASHTAG_COUNT = `Нельзя указать больше ${HASHTAGS_MAX_COUNT} хэш-тегов`;
const INVALID_DESCRIPTION_TEXT = `Не более ${DESCRIPTION_MAX_LENGTH} символов`;

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error'
});

const createHashtags = (value) => value.trim().toLowerCase().split(' ');

const validateHashtag = (item) => HASHTAG_GRAMMAR_RULES.test(item);

const isNameHashtagsValid = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = createHashtags(value);
  return hashtags.every((hashtag) => validateHashtag(hashtag));
};

const isHashtagRepeat = (value) => {
  const hashtags = createHashtags(value);
  return (new Set(hashtags)).size === hashtags.length;
};

const isHashtagTooMany = (value) => createHashtags(value).length <= HASHTAGS_MAX_COUNT;

const isDescriptionValid = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

const addValidator = () => {
  pristine.addValidator(hashtagInput, isNameHashtagsValid, INVALID_HASHTAG_NAME);
  pristine.addValidator(hashtagInput, isHashtagRepeat, INVALID_HASHTAG_REPEAT);
  pristine.addValidator(hashtagInput, isHashtagTooMany, INVALID_HASHTAG_COUNT);
  pristine.addValidator(descriptionInput, isDescriptionValid, INVALID_DESCRIPTION_TEXT);
};

const validateForm = () => pristine.validate();

export {validateForm, addValidator};
