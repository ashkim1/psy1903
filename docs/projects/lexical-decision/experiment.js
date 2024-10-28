// Initialize the jsPsych library
let jsPsych = initJsPsych({
    show_progress_bar: true
});

// Define the timeline as an empty array where we will add all our trials
let timeline = [];

// Age Check: Abort Experiment //
let ageCheckTrial = {
    type: jsPsychSurveyHtmlForm,
    html: `
    <h1>Welcome!</h1> 
    Please enter your age to continue: <input type='text' name='age' id='age'>
    `,
    autofocus: 'age',
    on_finish: function (data) {
        if (data.response.age < 18) {
            jsPsych.abortExperiment('You must be 18 years or older to complete this experiment.');
        }
    }
}
timeline.push(ageCheckTrial);

// // Full Screen //
// let enterFullScreenTrial = {
//     type: jsPsychFullscreen,
//     fullscreen_mode: true
// };

timeline.push(enterFullScreenTrial);

// CSS //
let colors = jsPsych.randomization.repeat(['red', 'green', 'blue'], 1);
let color = colors.pop();

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['f', 'j'],
    // Dynamically set the class based on our randomly chosen color
    stimulus: `
        <span class='${color}'>ball</span>`
    ,
};
// timeline.push(trial);

// Welcome //
let welcomeTrial = { // Define a welcome trial using jsPsych’s jsPsychHtmlKeyboardResponse plugin
    type: jsPsychHtmlKeyboardResponse, // Indicate the plugin type we’re using
    stimulus: `
    <h1 class='instructions'>Welcome to the Lexical Decision Task</h1> 
    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p class='instructions'>Press <span class='key'>SPACE</span> to begin the first part.</p>
    `, // What content to display on the screen
    choices: [' '], // Listen for the SPACE key to be pressed to proceed
};
timeline.push(welcomeTrial); // add to welcome trial to timeline array
// jsPsych.run(timeline); // invoke run method to run experiment


// CONDITIONS CODE IN DIFF FILE FOR ORGANIZATION PURPOSES //

// Prime Trial //
let primeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>You were randomly chosen to see this trial.</p> 
        <p>Press the <span class='key'>SPACE</span> key to continue.</p>
        `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
    },
    on_load: function () {
        if (getRandomNumber(0, 1) == 0) {
            jsPsych.data.addProperties({ sawPrime: false });
            jsPsych.finishTrial();
        } else {
            jsPsych.data.addProperties({ sawPrime: true });
        }
    }
}
timeline.push(primeTrial);


// Shuffle the conditions
for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <p>You are about to see a series of characters.</p>
            <p>If the characters make up a word, press the <span class='key'>F</span> key.</p>
            <p>If the characters do not make up a word, press the <span class='key'>J</span> key.</p>
            <p>Press <span class='key'>SPACE</span> to begin.</p>
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

        let feedbackTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1>Incorrect</h1>`,
            trial_duration: 1000,
            choices: ['NO KEY'],
            on_load: function () {
                let lastTrialData = jsPsych.data.getLastTrialData().values()[0];
                if (lastTrialData.correct) {
                    // Force skip this feedback trial if they got the previous trial correct
                    jsPsych.finishTrial();
                }
            },
        }
        timeline.push(feedbackTrial);
    }
}

// Results Trial //
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        let dataPipeExperimentId = 'Ib1PGFLsDH5z';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

// // Exit Full Screen //
// let exitFullScreenTrial = {
//     type: jsPsychFullscreen,
//     fullscreen_mode: false
// };
// timeline.push(exitFullScreenTrial);

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating!</h1> 
    <p>You can close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        jsPsych.progressBar.progress = 1;
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