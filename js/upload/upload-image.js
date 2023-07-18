const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', '.webp'];

const imageInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const renderUploadImage = () => {
  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export {renderUploadImage};
