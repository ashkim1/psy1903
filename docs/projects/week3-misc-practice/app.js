// Misc Practice Part A
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;


let response = prompt("What is " + num1 + " + " + num2 + "?");

let feedback = '';

let answer = num1 + num2;

if (response == answer) {
    feedback = 'Correct!';
} else if (response == answer - 1 || response == answer + 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + " The expected answer is " + answer + ".");


// Misc Practice Part B
let age = prompt('How old are you?');
if (age < 12) {
    alert('Child');
}
if (age >= 12 && age < 18) {
    alert('Teenager');
}
if (age >= 18) {
    alert('Adult');
}