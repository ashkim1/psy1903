let jsPsych = initJsPsych({
    show_progress_bar: true
});

let timeline = [];

// Welcome Trial //
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='expName'>Welcome to the Harvard Mental Health Stigma IAT!</h1> 

    <p>In this experiment, you will complete the following three tasks:</p>

    <p>In <span class = 'bold'>Task 1</span>, you will be asked to watch a short video.</p>
    <p>In <span class = 'bold'>Task 2</span>, you will answer a brief series of questions.</p>
    <p>In <span class = 'bold'>Task 3</span>, you will be asked to categorize a series of words.</p>

    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
}
timeline.push(welcomeTrial);

// bullets: use ul and li + text-align

// Video Trial //
let videoTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` 
    <h1> <span class = 'title'>Task 1 of 3</span></h1>
    <p> Please watch the following video </p>
    <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/AYAHkql75qM?si=OVFCmPnPwVTmPB3K" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
        tabindex="-1">
        </iframe>
    <p> Press the <span class = 'key'>SPACE</span> key when you have completed the video and are ready to move on to the next task. </p>
    `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
        whichPrime: 'video'
    },
};
timeline.push(videoTrial);



// IAT //
//Beginning the outer loop
//Establishing counter for the four-part block seperation screens
let counter = 1;

for (let block of conditions) {

    // Setting left and right category variables
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    // Screen with instructions, indicating the two categories
    let blockintroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1><span class = 'title'>Part ${counter++} of 4</span></h1> 
        <p>In this part, the two categories will be: <span class = 'bold'>${leftCategory}</span> and <span class = 'bold'>${rightCategory}</span></p>
        <p>If the word you see in the middle of the screen should be sorted into the <span class = 'bold'>${leftCategory}</span> category, press the <span class = 'key'>F</span> key.</p>
        <p>If thee word you see in the middle of the screen should be sorted into the  <span class = 'bold'>${rightCategory}</span> category, press the <span class = 'key'>J</span> key.</p>
        <p>Press the <span class = 'key'>SPACE</span> to begin.</p>  
        `,
        choices: [' '],
    }
    timeline.push(blockintroTrial);

    // Trial inner loop
    for (let trial of block.trials) {
        let iatTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <span class= 'category1' > <strong>${leftCategory}</strong> (press F)</span>
            <span class='category2'> <strong>${rightCategory}</strong> (press J)</span>
            <p class='word'>${trial.word}</p>`,
            choices: ['f', 'j'],
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory,
            },
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    data.correct = true;
                } else {
                    data.correct = false;
                };
            }
        }
        timeline.push(iatTrial);

        // Adding the fixation trial in between iatTrials
        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+ `,
            trial_duration: 250,
            choices: ['NO KEY']
        }
        timeline.push(fixationTrial);
    }
}

// Survey Trial //
// Define likert scale
let likertScale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

// Survey questions
let survey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I feel comfortable expressing my feelings.", labels: likertScale },
        { prompt: "I feel that my mental health is valued at Harvard.", labels: likertScale },
        { prompt: "At Harvard, I feel like I belong.", labels: likertScale },
        { prompt: "Mental health is something that should be taken seriously.", labels: likertScale },
        { prompt: "It is normal to have issues with mental health.", labels: likertScale },
        { prompt: "Physical health issues", labels: likertScale },
    ],
    randomize_question_order: true,
    data: {
        collect: true,
        trialType: 'questionnaire',
    },
};
timeline.push(survey);



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
        let prefix = 'iat';
        let dataPipeExperimentId = 'Ib1PGFLsDH5z';
        let forceOSFSave = false;

        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);



// Debrief //
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for your participation!</h1> 
    <p>The experiment is complete. You can now close this tab.</p>
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