const EFFECTS = [
  {
    name: 'chrome',
    property: 'grayscale',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    property: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    property: 'invert',
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    property: 'blur',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    property: 'brightness',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    unit: ''
  },
];

const rangeContainer = document.querySelector('.img-upload__effect-level');
const rangeElement = document.querySelector('.effect-level__slider');
const valueInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects');
const img = document.querySelector('.img-upload__preview img');

const hideRangeContainer = () => rangeContainer.classList.add('hidden');

const setDefaultValue = () => {
  valueInput.Value = 0;
  rangeElement.noUiSlider.set(valueInput.Value);
};

const createSlider = () => {
  noUiSlider.create(rangeElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const setNewEffect = (element, value) => {
  img.style.filter = `${element.property}(${value}${element.unit})`;
};

const setUpdateOptions = (element) => {
  rangeElement.noUiSlider.updateOptions({
    range: {
      min: element.minValue,
      max: element.maxValue,
    },
    start: element.maxValue,
    step: element.step,
  });
};

const removeSlider = () => {
  img.style.filter = null;
  setDefaultValue();
  hideRangeContainer();
};

const onEffectsListClick = (event) => {
  if(event.target.tagName === 'INPUT' && event.target.value !== 'none') {
    rangeContainer.classList.remove('hidden');
    const index = EFFECTS.findIndex((item) => item.name === event.target.value);
    setUpdateOptions(EFFECTS[index]);
    rangeElement.noUiSlider.on('update', () => {
      valueInput.value = rangeElement.noUiSlider.get();
      setNewEffect(EFFECTS[index], valueInput.value);
    });
    return;
  }
  removeSlider();
};

const addPhotoFilters = () => {
  hideRangeContainer();
  effectsList.addEventListener('click', onEffectsListClick);
};

export {addPhotoFilters, removeSlider, onEffectsListClick, createSlider};
