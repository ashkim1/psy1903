// // celciusToFahrenheit
// function celciusToFahrenheit(tempC) {
//     let tempF = (tempC * 1.8) + 32;
//     return tempF;
// }

// console.log(celciusToFahrenheit(10)); // 50
// console.log(celciusToFahrenheit(-5)); // 23



// // convertTemp

// function convertTemp(temp, convertTo) {
//     if (convertTo == 'c') {
//         return ((temp - 32) / 1.8);
//     } else if (convertTo == 'f') {
//         return ((temp * 1.8) + 32);
//     }
// }

// console.log(convertTemp(10, 'c')); // -12.2222
// console.log(convertTemp(10, 'f')); // 50



// // getWordLengths

// function getWordLengths(words) {
//     let length = [];
//     for (let word of words) {
//         length.push(word.length);
//     }
//     return length;
// }

// words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getWordLengths(words)); // [5, 6, 6, 4, 5]



// // getLongestWord

// function getLongestWord(words) {
//     let longestWord = '';
//     for (let word of words) {
//         if (word.length > longestWord.length) {
//             longestWord = word;
//         }
//     }
//     return longestWord;
// }

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getLongestWord(words)); // banana



// // getOddNumbers

// function getOddNumbers(numbers) {
//     let results = [];
//     for (let number of numbers) {
//         if (number % 2 == 1) {
//             results.push(number);
//         }
//     }
//     return results;
// }

// console.log(getOddNumbers([1, 2, 3, 4, 5])); // [1, 3, 5]
// console.log(getOddNumbers([12, 45, 10, 11, 61])); // [45, 11, 61]



// // filterNumbers

// function filterNumbers(numbers, evenOrOdd) {
//     let results = [];
//     if (evenOrOdd == 'even') {
//         for (let number of numbers) {
//             if (number % 2 == 0) {
//                 results.push(number);
//             }
//         }
//     } else if (evenOrOdd == 'odd') {
//         for (let number of numbers) {
//             if (number % 2 == 1) {
//                 results.push(number);
//             }
//         }
//     }
//     return results;
// }

// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // [1, 3, 5]

// console.log(filterNumbers([45, 10, 11, 61], 'even')); // [10]
// console.log(filterNumbers([45, 10, 11, 61], 'odd')); // [45, 11, 61]



// Even/Odd Response Time Task

alert(`Welcome to the even/odd response time task.

You are about to see a series of numbers.

If the number you see is EVEN, type the letter "e".
If the number you see is ODD, type the letter "o".

Please answer as quickly and accurately as possible.`);


let results = [];

for (let i = 0; i < 5; i++) {
    let num = getRandomNumber(1, 20); //refactored using function
    let start = Date.now();
    let response = prompt(`
        Number: ` + num + `
        Type the letter "e" for EVEN.
        Type the letter "o" for ODD.`
    );
    let end = Date.now();
    let responseTime = (end - start) / 1000;

    let trueFalse = '';
    if (response == 'e' && num % 2 == 0) {
        trueFalse = true;
    } else if (response == 'e' && num % 2 != 0) {
        trueFalse = false;
    } else if (response == 'o' && num % 2 == 1) {
        trueFalse = true;
    } else if (response == 'o' && num % 2 != 1) {
        trueFalse = false;
    }

    let result = {
        number: num,
        response: response,
        correct: trueFalse,
        responseTime: responseTime
    }

    results.push(result);
}

alert('Thank you for your time!');

console.log(results);


// Functions 
// getRandomNumber
function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}
