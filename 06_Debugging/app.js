function sayHello() {
  console.log("Hello!!");
}

function calculate(num1, num2) {
  console.log("calculating...");
  const result = num1 + num2;
  sayHello();
  return result;
}

calculate(1, 2);

const stop = 4;

for (let i = 0; i < 5; i++) {
  console.log("Value of i is: ", i);
  if (i === stop) {
    break;
  }
}
