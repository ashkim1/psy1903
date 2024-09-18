// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

// Randomly generated numbers
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1Output.innerHTML = num1;
num2Output.innerHTML = num2;


// Start timer!
let start = Date.now();


// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer and calculate response time
    let end = Date.now();
    let responseTime = (end - start) / 1000;

    // Collect the response
    let response = form.elements['response'].value;

    // Correct or incorrect
    let correctAnswer = num1 + num2;
    let feedback = '';

    if (response == correctAnswer) {
        feedback = ' (correct)';
    } else if (response != correctAnswer) {
        feedback = ' (incorrect)';
    }

    // Report the results
    results.innerHTML = 'You answered ' + response + feedback + ' in ' + responseTime + ' seconds.';

    // Hide the form (including instructions) wait to run this code once you get results
    form.style.display = 'none'; // the instructions, Q, and box for response

});

