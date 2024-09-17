// Conditionals

// let response = prompt("What is 4 + 6");

// if/else condition
/* 
if (response == 10) {
    alert("You got it correct!");
} else {
    alert("You got it incorrect.");
} 
*/

// chaining together if/else if condition
/* 
if (response == 10) {
    alert('Correct!');
} else if (response >= 8 && response <= 12) {
    alert('Close! The answer is 10.');
} else {
    alert('Incorrect. The answer is 10.');
} 
*/

// additional example:
/* 
if (response == 10) {
    alert('Correct! The answer is 10.');
} else if (response == 9 || response == 11) {
    alert('Very close! The answer is 10.');
} else if (response == 8 || response == 12) {
    alert('Close! The answer is 10.');
} else {
    alert('Incorrect. The answer is 10.');
} 
*/


// Refactoring

let response = prompt('What is 4 + 6?');

// ⭐ Centralize the answer language by storing it in a variable
/* 
let correctAnswer = 'The answer is 10';

if (response == 10) {
    alert('Correct! ' + correctAnswer);
} else if (response == 9 || response == 11) {
    alert('Very close! ' + correctAnswer);
} else if (response == 8 || response == 12) {
    alert('Close! ' + correctAnswer);
} else {
    alert('Incorrect ' + correctAnswer);
} 
but this is still a bit redundant
*/

// So you could also do this:
/* 
if (response == 10) {
    alert('Correct!');
} else if (response == 9 || response == 11) {
    alert('Very close!');
} else if (response => 8 || response <= 12) {
    alert('Close!');
} else {
    alert('Incorrect');
}

// ⭐ Print the answer outside the if/else if/else block 
// since it needs to print no matter the outcome
alert('The answer is 10');
 */


// OR this

// Initialize a feedback variable that will be 
// updated based on the condition met below
let feedback = '';

if (response == 10) {
    feedback = 'Correct!';
} else if (response == 9 || response == 11) {
    feedback = 'Very close!';
} else if (response == 8 || response == 12) {
    feedback = 'Close!';
} else {
    feedback = 'Incorrect';
}

alert(feedback + ' The answer is 10');