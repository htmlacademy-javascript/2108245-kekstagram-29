// Задание 1

const isLengthNormal = (string, maxLength) => string.length <= maxLength;

//Задание 2

const isPalindrome = (string) => {
  const reduceString = string.toLowerCase().replaceAll(' ', '');
  if (reduceString.length > 1) {
    let reverseString = '';
    for (let i = reduceString.length - 1; i >= 0; i--) {
      reverseString += reduceString.at(i);
      };
    return reverseString === reduceString;
  };
  return false;
};

// Дополнительное задание

const onlyNumber = (data) => {
  const string = String(data);
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(+string.at(i)) && string.at(i) !== ' ') {
      newString = newString + string.at(i);
    }
  }
  return parseFloat(newString);
};
