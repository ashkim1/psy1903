
let experiment = "Stroop";

let welcomeMessage = `
Welcome to our ` + experiment + ` experiment! 
Please read the intructions carefully.
`;

/* console.log(welcomeMessage);
console.log(typeof experiment); // string
console.log(experiment.charAt(1)); //"t" */

let trialCountMax = 20;
// console.log(typeof trialCountMax); // number
// console.log(trialCountMax charAt(0)) // error

// TODO: Randomize colors
let colors = ["red", "green", "blue"];

// alert("Welcome to the " + experiment + " experiment!");

trialCountMax = 40;

// At the halway point, we will display a pause screen
let halfWayCount = trialCountMax / 2;

// console.log(halfWayCount); // Expected: 20

let correct = true;
console.log(typeof correct); //boolean
console.log(correct); // true

console.log(10 > 15); // false
console.log(10 <= 15); // true

let age = 25;
let adult = age > 18;

console.log(adult); // true 
console.log(typeof adult); // boolean

// An Array of Numbers
let scores = [75.5, 91, 91.6, 92.3, 45.5];

// An Array of Strings
let words = ['pear', 'mouse', 'red', 'igloo'];

// An Array of mixed data types, including a sub-array
let misc = [90, 'green', 45.5, ['a', 'b', 'c']];

let experiment = {
    name: 'Stroop',
    colors: ['red', 'green', 'blue'],
    trialCount: 10
};
