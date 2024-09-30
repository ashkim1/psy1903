// Initialize the jsPsych library
let jsPsych = initJsPsych();

// Define the timeline as an empty array where we will add all our trials
let timeline = [];


// Welcome //
let welcomeTrial = { // Define a welcome trial using jsPsych’s jsPsychHtmlKeyboardResponse plugin
    type: jsPsychHtmlKeyboardResponse, // Indicate the plugin type we’re using
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p>Press SPACE to begin the first part.</p>
    `, // What content to display on the screen
    choices: [' '], // Listen for the SPACE key to be pressed to proceed
};
timeline.push(welcomeTrial); // add to welcome trial to timeline array
// jsPsych.run(timeline); // invoke run method to run experiment


// CONDITIONS CODE IN DIFF FILE FOR ORGANIZATION PURPOSES //


// Shuffle the conditions
for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1); // Shuffle the conditions

    for (let condition of blockConditions) { //loop
        let conditionTrial = { //create object within for loop
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>${condition.characters}</h1>`, //pulling from array of conditions
            choices: ['f', 'j'], //listen for either the f or j key to proceed
            data: {
                collect: true,
                characters: condition.characters,
                blockId: block.title
            },
            choices: ['f', 'j'],
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);