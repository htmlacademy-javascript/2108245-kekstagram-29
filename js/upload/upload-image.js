const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', '.webp'];

const imageInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const renderUploadImage = () => {
  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${URL.createObjectURL(file)}`;
    });
  }
};

export {renderUploadImage};
