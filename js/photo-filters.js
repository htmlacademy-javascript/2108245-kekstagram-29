const EFFECTS = {
  chrome: {
    property: 'grayscale',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    property: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    property: 'invert',
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    property: 'blur',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    property: 'brightness',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    unit: ''
  },
  default: {
    start: 100,
    minValue: 0,
    maxValue: 100,
    step: 1,
    unit: ''
  }
};

const rangeContainer = document.querySelector('.img-upload__effect-level');
const rangeElement = document.querySelector('.effect-level__slider');
const valueInput = document.querySelector('.effect-level__value');
const img = document.querySelector('.img-upload__preview img');

const setSliderState = (value) => {
  if (value === 'none') {
    rangeContainer.classList.add('hidden');
    return;
  }
  rangeContainer.classList.remove('hidden');
};

const setDefaultValue = () => {
  valueInput.Value = 0;
  rangeElement.noUiSlider.set(valueInput.Value);
};

const createSlider = (value) => {
  setSliderState(value);
  const settings = EFFECTS[value] || EFFECTS.default;
  noUiSlider.create(rangeElement, {
    range: {
      min: settings.minValue,
      max: settings.maxValue,
    },
    start: settings.start,
    step: settings.step,
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

const removeSlider = (value) => {
  img.style.filter = null;
  setDefaultValue();
  setSliderState(value);
};

const onEffectsListChange = ({target}) => {
  if(target.value === 'none') {
    removeSlider();
    return;
  }

  setSliderState(target.value);
  setUpdateOptions(EFFECTS[target.value]);
  rangeElement.noUiSlider.on('update', () => {
    valueInput.value = rangeElement.noUiSlider.get();
    setNewEffect(EFFECTS[target.value], valueInput.value);
  });
};

const addPhotoFilters = (value) => {
  setSliderState(value);
};

export { addPhotoFilters, removeSlider, onEffectsListChange, createSlider };
