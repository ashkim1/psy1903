// Initialize an empty array you will populate with your conditions
let conditions = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let answer = (num1 + num2);

    conditions.push({
        'num1': num1,
        'num2': num2,
        'answer': answer,
    });
}

// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);

// Functions
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}