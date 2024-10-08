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

