let jsPsych = initJsPsych();

let timeline = [];

// Welcome Trial //
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='expName'>Welcome to the Harvard Mental Health Stigma IAT!</h1> 

    <p>In this experiment, you will complete the following three tasks:</p>

    <p>In Task 1, you will be asked to watch a short video.</p>
    <p>In Task 2, you will answer a brief series of questions.</p>
    <p>In Task 3, you will be asked to categorize a series of words.</p>

    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
}
timeline.push(welcomeTrial);


for (let block of conditions) {

    // Screen with instructions, indicating the two categories
    // and the expected keys to be pressed
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    for (let trial of block.trials) {
        // Screen that displays trial.word in the center
        // as well as the left/right categories
        // listening for key response (f,j)
        // on_finish: process the response, store the appropriate data

        let example = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `...`,
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {
                // if data.response == trial.expectedResponse
                // data.correct = true
                // else
                // data.correct = false
            }
        }
        timeline.push(example);
    }
}

jsPsych.run(timeline);