// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById("num1");
let num2Output = document.getElementById("num2");

let num1 = Math.floor(Math.random() * 10) + 1; // randomly generated numbers
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

// equation.innerHTML = "What is " + num1 + " + " + num2 + "?";

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer!

    // Calculate response time

    // Collect the response
    //let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    // Hide the form (including instructions) wait to run this code once you get results
    form.style.display = "none"; // the instructions, Q, and box for response

});

let count = 8;
console.log(count % 2 == 0);
