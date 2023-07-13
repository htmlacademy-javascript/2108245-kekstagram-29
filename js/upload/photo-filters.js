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
    minValue: 0,
    maxValue: 100,
    step: 1
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

const setNewValue = (element, value) => {
  if (element === EFFECTS.default) {
    img.style.filter = null;
    return;
  }

  img.style.filter = `${element.property}(${value}${element.unit})`;
};

const updateSlider = (value) => {
  rangeElement.noUiSlider.on('update', () => {
    valueInput.value = rangeElement.noUiSlider.get();
    setNewValue(value, valueInput.value);
  });
};

const createSlider = (value) => {
  setSliderState(value);
  const settings = EFFECTS[value] || EFFECTS.default;
  noUiSlider.create(rangeElement, {
    range: {
      min: settings.minValue,
      max: settings.maxValue,
    },
    start: settings.maxValue,
    step: settings.step,
    connect: 'lower',
  });

  updateSlider(settings);
};

const setUpdateOptions = (value) => {
  const settings = EFFECTS[value] || EFFECTS.default;
  setSliderState(value);
  rangeElement.noUiSlider.updateOptions({
    range: {
      min: settings.minValue,
      max: settings.maxValue,
    },
    start: settings.maxValue,
    step: settings.step,
  });
  updateSlider(settings);
};

export {setUpdateOptions, createSlider};
