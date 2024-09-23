// Part 0. Demonstrate string interpolation technique with backticks (`)
// let feedback = 'correct';
// let responseTime = 2.4;
// let answer = 25;

// alert('You are ' + feedback + '. Answer: ' + answer + '. Response time: ' + responseTime);
// alert(`You are ${feedback}. Answer: ${answer}. Response time: ${responseTime}`);

// Part 1. Functions
//let num1 = getRandomNumber(1, 10);
//let num2 = getRandomNumber(0, 100);
// 0, 10 is an argument

//console.log(num1);
//console.log(num2);

//displayRandomNumber();

//function getRandomNumber(min, max) {
//let randomNumber = Math.floor(Math.random() * max) + min;
//return randomNumber;
//}
// the mix, max are parameters


//function displayRandomNumber() {
//alert(getRandomNumber(1, 10));
//}
// generate alert WITH our results. no return


// E.G. of function with 2 parameters
/* function calculateRectangleArea(length, width) {
    let area = length * width;
    return area;
} */

// refactor ^
//function calculateRectangleArea(length, width) {
//return length * width;
//}

// Example invoking the above function and writing it’s return value to the console
//console.log(calculateRectangleArea(10, 10)) // 100

// Example invoking the above function and capturing its return value in a variable
//let area = calculateRectangleArea(10, 5);
//console.log(area); // 50




//ARRAYS 

// Scalar data types:
/* let name = 'James'; // String
let age = 15; // Number
let adult = false; // Boolean
 */

// Arrays:
// of Numbers
//let ages = [45, 23, 28, 35, 35];
// of Strings
// let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];
// An Array can contain other Arrays
//let numbers = [1, 2, 3, [8, 9, 10]];
// of mixed data types
//let mixed = ['a', 'b', 1, 2, [true, false]];

//E.G. position
/* let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];
console.log(names[1]); // Jamal
console.log(names[0]); // Alice
console.log(names[3]); // Kyle */
// console.log(names[4]); // undefined because there is no 4th element
/* names[1] = 'Bob';
console.log(names); // output: Jamal replaced by Bob and gives whole array
names.push('Sara'); // adds Sara at end of array */
// names.unshift('Sara'); // this would add Sara to beginning of array
/* console.log(names); // Sara should be added at end
console.log(names[4]); // output: Sara. no longer undefined

names.unshift('Sara');
console.log(names);
console.log(names[4]); */



// Part 3. Loops

//let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

/* for (let name of names) {
    console.log(name);
} */

//let namesThatStartWithA = [];

//for (let name of names) {
//if (name.charAt(0) == 'A') {
//namesThatStartWithA.push(name); // turns into array of names 'A'
//}
//}

//console.log(namesThatStartWithA);

// Part 4. Numerical for loops
/* let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10); //refactor using function
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt("What is " + num1 + " + " + num2 + "?");

    let end = Date.now();

    let responseTime = (end - start) / 1000;

    let feedback = "";

    let correctAnswer = num1 + num2;

    if (response == correctAnswer) {
        feedback = " (correct)";
    } else if (response != correctAnswer) {
        feedback = " (incorrect)";
    }

    results.push([feedback, responseTime]);

    alert("You answered " + response + feedback + " in " + responseTime + " seconds.");

}

console.log(results); // gives array of results  */




function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}



// Part 5. Objects

// Arrays: Store multiple elements, accessed via numerical indexes
// let participantA = ['Alice', 21, true];

// let participantB = {
//     name: 'Alice',
//     age: 21,
//     consent: true
// }
// participantB.consent = false;
// participantB.startTime = '2:00pm'; //adds as new key:value pair
// delete participantB.age;
// console.log(participantB);

// if (participantA[2]) {
//     // ...
// }

// if (participantB.consent) {
//     // ...
// }

let person = {
    // Strings
    firstName: 'Elliot',
    lastName: 'Brown',

    // Number
    age: 30,

    // Array
    hobbies: ['reading', 'gaming', 'hiking'],

    // Nested Object
    address: {
        street: '324 Western Ave',
        city: 'Cambridge',
        zipCode: '02139'
    },

    // Functions
    // Observe how the keyword *this* is used in functions to reference other properties within this object
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`;
    },

    greet: function () {
        return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
    },

    getAddress: function () {
        return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
    },

    getHobbies: function () {
        return `My hobbies include ${this.hobbies.join(', ')}`;
    }
};

// Testing the functions, accessed via dot notation and invoked with parenthesis
console.log(person.getAddress());
console.log(person.greet()); // Hello, my name is Elliot Brown and I am 30 years old.

console.log(person.getAddress()); // I live at 324 Western Ave, Cambridge 02139
console.log(person.getHobbies()); // My hobbies include reading, gaming, hiking

// Testing the properties
console.log(person.firstName); // Elliot
console.log(person.age); // 30



// Part 6. properties, keys e.g.
let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10); //refactor using function
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt("What is " + num1 + " + " + num2 + "?");
    let end = Date.now();
    let time = (end - start) / 1000;
    let feedback = "";
    let answer = num1 + num2;

    if (response == answer) {
        feedback = " (correct)";
    } else if (response != answer) {
        feedback = " (incorrect)";
    }

    let result = {
        response: response,
        answer: answer,
        feedback: feedback,
        time: time
    }

    results.push(result);

    // OR
    /* results.push({
        response: response,
        answer: answer,
        feedback: feedback,
        time: time
    }); */

    alert("You answered " + response + feedback + " in " + time + " seconds.");

}

console.log(results); // gives array of results 