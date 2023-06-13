// Задание 1

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20);

//Задание 2

const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

isPalindrome('Лёша на полке клопа нашёл ');

// Дополнительное задание

const extractNumber = (string) => parseFloat(String(string).replace(/\D/g,''));

console.log(extractNumber('1 кефир, 0.5 батона'));
