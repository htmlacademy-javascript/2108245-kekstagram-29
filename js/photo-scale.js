const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const PERCENT_DIVIDER = 100;
const DEFAULT_VALUE = 100;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlInput = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview img');

const leadValue = () => parseInt(controlInput.value, 10);

const setNewValue = (value) => {
  img.style.transform = `scale(${value / PERCENT_DIVIDER})`;
  controlInput.value = `${value}%`;
};

const onControlSmallerClick = (event) => {
  event.preventDefault();
  if (leadValue() >= SCALE_MIN + SCALE_STEP) {
    const currentValue = leadValue() - SCALE_STEP;
    setNewValue(currentValue);
  }
};

const onControlBiggerClick = (event) => {
  event.preventDefault();
  if (leadValue() <= SCALE_MAX - SCALE_STEP) {
    const currentValue = leadValue() + SCALE_STEP;
    setNewValue(currentValue);
  }
};

const resetScale = () => setNewValue(DEFAULT_VALUE);

const addPhotoScale = () => {
  controlSmaller.addEventListener('click', onControlSmallerClick);
  controlBigger.addEventListener('click', onControlBiggerClick);
};

export { addPhotoScale, resetScale };
