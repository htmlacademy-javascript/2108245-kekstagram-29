const SCALE_STEP = 25;
const SCALE_MIN = 0;
const SCALE_MAX = 100;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlInput = document.querySelector('.scale__control--value');
const img = document.querySelector('.img-upload__preview img');

const leadValue = () => parseInt(controlInput.value, 10);
const setNewValue = (value) => {
  img.style.transform = `scale(${value / 100})`;
  controlInput.value = `${value}%`;
};

const onControlSmallerClick = () => {
  if (leadValue() >= SCALE_MIN + SCALE_STEP) {
    const currentValue = leadValue() - SCALE_STEP;
    setNewValue(currentValue);
  }
};

const onControlBiggerClick = () => {
  if (leadValue() <= SCALE_MAX - SCALE_STEP) {
    const currentValue = leadValue() + SCALE_STEP;
    setNewValue(currentValue);
  }
};

const addPhotoScale = () => {
  controlSmaller.addEventListener('click', onControlSmallerClick);
  controlBigger.addEventListener('click', onControlBiggerClick);
};

export {addPhotoScale};
