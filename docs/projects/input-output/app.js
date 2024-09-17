// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0]; // “select” the form on the page and store a reference to it in the variable named form
// Corresponding element below
// <form>
// What is your name?
//      <input type='text' name='response'>
//      <button type='submit'>Submit</button>
// </input></form>

let results = document.getElementById('results'); // target results
// note: ids should be unique throughout a page, so should only yield 1 result
// Corresponding HTML element:
// <p id='results'></p>


// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let name = form.elements['name'].value; // response is the input we want to collect, so the .value gets Ash we put in

    let over18 = form.elements["age"].checked;
    // console.log(over18) // output: true in console if box is checked - use console.log when checking

    let resultsMessage = "";

    if (over18) {
        resultsMessage = results.innerHTML = 'Hello ' + name + '!';
    } else {
        resultsMessage = "Thank you for your interest, but this experiment is for individuals over 18 only.";
    }

    // Report the results
    /* results.innerHTML = 'Hello ' + response + '!';
}); // Hello Ash! */

    results.innerHTML = resultsMessage
});