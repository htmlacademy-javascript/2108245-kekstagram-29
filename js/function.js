// Задание 1

const isLengthNormal = (string, maxLength) => string.length <= maxLength;

//Задание 2

const isPalindrome = (string) => {
  const reduceString = string.toLowerCase().replaceAll(' ', '');
  if (reduceString.length > 1) {
    const averageSymbol = Math.trunc(reduceString.length / 2);
    for (let i = 0; i < averageSymbol; i++) {
      return reduceString.at(i) === reduceString.at(-1 - i);
    }
  }
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
}
