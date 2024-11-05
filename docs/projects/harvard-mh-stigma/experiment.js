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

    <span class='box'>
    <ul>
        <li>In Task 1, you will be asked to watch a short video.</li>
        <li>In Task 2, you will be asked to categorize a series of words.</li>
        <li>In Task 3, you will answer a brief series of questions.</li>
    </ul>
    </span>

    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
}
timeline.push(welcomeTrial);

let consentTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> <span class = 'title'>Consent</span></h1>

    <p>This experiment is an educational exercise about learning to program and analyze a psychological experiment and not a “real” scientific experiment. No identifying information is collected, and data will not be shared beyond our class.</p>
        
    <p>If you agree to help out by completing the tasks and questionnaires, please press <span class='key'>SPACE</span> to continue. Otherwise, you may close this tab.</p>
    
    <p>If you have any questions, please reach out to Dr. Garth Coombs <garthcoombs@fas.harvard.edu>, one of the head instructors of PSY 1903: Programming for Psychological Scientists.</p>
    `,
    choices: [' '],
}
timeline.push(consentTrial);


// Video Trial //

let primeVideos = [
    { url: "https://www.youtube.com/embed/AYAHkql75qM?si=OVFCmPnPwVTmPB3K", label: 'harvard' },
    { url: "https://www.youtube.com/embed/CKIMKEXKUas?si=kUzLdVqQkcWFjVJL", label: 'degree' }
];

let randomVideo = primeVideos[Math.floor(Math.random() * primeVideos.length)];

let videoTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` 
    <h1> <span class = 'title'>Task 1 of 3</span></h1>
    <p> Please watch the following video </p>
    <iframe width="560" height="315" 
        src="${randomVideo.url}" 
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
        whichPrime: randomVideo.label
    }
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
        { prompt: "If I had a mental disorder, I would feel ashamed.", labels: likertScale },
        { prompt: "If I had a mental disorder and I could not solve my own problems, I would feel bad about myself.", labels: likertScale },
        { prompt: "I would feel a failure if I became mentally unwell.", labels: likertScale },
        { prompt: "If I had a mental disorder, I would feel like no one would want to get close to me.", labels: likertScale },
        { prompt: "If I had a mental disorder, I would feel weak.", labels: likertScale },
        { prompt: "If I had a mental disorder, I would be happy to seek help from a mental health professional.", labels: likertScale },
        { prompt: "I would feel comfortable discussing a colleague's mental health problem with them.", labels: likertScale },
        { prompt: "I'm good at talking to people with mental health problems.", labels: likertScale },
        { prompt: "If I were an employer, I would feel comfortable employing someone with a mental disorder.", labels: likertScale },
        { prompt: "Having a mental disorder is nothing to be ashamed of.", labels: likertScale },
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