let jsPsych = initJsPsych();

let timeline = [];

// Welcome Trial //
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='expName'>Welcome to the Math Response Time Task</h1> 

    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>There are three parts to this experiment; the questions will increase in difficulty with each part.</p> 
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
}
timeline.push(welcomeTrial);

let likertScale = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
];

let survey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: 'I enjoy solving math problems.', labels: likertScale },
        { prompt: 'I find math easy.', labels: likertScale },
    ],
}
timeline.push(survey);


// Blocks  // 

for (let block of conditions) {
    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1>${block.title}</h1>
        <p>Press space to begin.</p>
        `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    for (let question of block.questions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p class='equation'> What is <span class='num'>${question.num1}</span> + <span class='num'>${question.num2}</span>?</p>`,
            html: `<p><input type='text' name='response' id='response'></p>`,
            autofocus: 'response',
            button_label: 'Submit Answer',
            data: {
                collect: true,
                num1: question.num1,
                num2: question.num2,
                answer: question.answer,
                block: block.title,
            },
            on_finish: function (data) {
                data.response = data.response.response;
                if (data.response == data.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                };
            }
        }
        timeline.push(conditionTrial);
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
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
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
    <h1>Thank you!</h1> 
    <p>You can now close this tab.</p>
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

