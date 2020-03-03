const object = {
  a: 'somestring',
  b: 42,
  c: false,
  k: 11,
};
const numbers = [];

Object.keys(object).forEach((key) => {
  if (typeof object[key] === 'number') {
    numbers.push(object[key]);
  }
});

console.log(numbers);
// expected output: Array [42, 11]
