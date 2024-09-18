// Welcome alert //
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.")


// Trial 1 //
let start = Date.now();

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let trial1 = prompt("What is " + num1 + " + " + num2 + "?");

let end = Date.now();

let responseTime = (end - start) / 1000;

let feedback = "";

let correctAnswer = num1 + num2;

if (trial1 == correctAnswer) {
    feedback = " (correct)";
} else if (trial1 != correctAnswer) {
    feedback = " (incorrect)";
}

alert("You answered " + trial1 + feedback + " in " + responseTime + " seconds.");



// Trial 2 //
start = Date.now();

num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;

let trial2 = prompt("What is " + num1 + " + " + num2 + "?");

end = Date.now();

responseTime = (end - start) / 1000;

feedback = "";

correctAnswer = num1 + num2;

if (trial2 == correctAnswer) {
    feedback = " (correct)";
} else if (trial2 != correctAnswer) {
    feedback = " (incorrect)";
}

alert("You answered " + trial2 + feedback + " in " + responseTime + " seconds.");



// Trial 3 //
start = Date.now();

num1 = Math.floor(Math.random() * 10) + 1;
num2 = Math.floor(Math.random() * 10) + 1;

let trial3 = prompt("What is " + num1 + " + " + num2 + "?");

end = Date.now();

responseTime = (end - start) / 1000;

feedback = "";

correctAnswer = num1 + num2;

if (trial3 == correctAnswer) {
    feedback = " (correct)";
} else if (trial3 != correctAnswer) {
    feedback = " (incorrect)";
}

alert("You answered " + trial3 + feedback + " in " + responseTime + " seconds.");


// Thank you alert //
alert("Thank you for your participation!")
