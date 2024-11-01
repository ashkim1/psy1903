let jsPsych = initJsPsych({
    extensions: [
        { type: jsPsychExtensionWebgazer }
    ]
});
let timeline = [];

// Welcome Trial //
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Eye Tracking Demo</h1> 

    <p>This is a demo experiment using webgazer plugins</p>

    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
}
timeline.push(welcomeTrial);

// Camera //
let cameraInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>In order to participate you must allow the demo experiment to use your camera.</p>
      <p>You will be prompted to do this on the next screen.</p>
      <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
      <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
    `,
    choices: ['Got it'],
}
timeline.push(cameraInstructions);

let initCamera = {
    type: jsPsychWebgazerInitCamera
}
timeline.push(initCamera);

// Calibration //
let calibrationInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
      <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
    `,
    choices: ['Got it'],
}
timeline.push(calibrationInstructions);

let calibration = {
    type: jsPsychWebgazerCalibrate,
    calibration_points: [
        [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    repetitions_per_point: 2,
    randomize_calibration_order: true
}
timeline.push(calibration);

// Validation //
let validationInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>Now we'll measure the accuracy of the calibration.</p>
      <p>Look at each dot as it appears on the screen.</p>
      <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
    `,
    choices: ['Got it'],
    post_trial_gap: 1000
}
timeline.push(validationInstructions)

let validation = {
    type: jsPsychWebgazerValidate,
    validation_points: [
        [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    roi_radius: 200,
    time_to_saccade: 1000,
    validation_duration: 2000,
    data: {
        task: 'validate'
    }
}
timeline.push(validation);

// Recalibrate //
let recalibrateInstructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>The accuracy of the calibration is a little lower than we'd like.</p>
      <p>Let's try calibrating one more time.</p>
      <p>On the next screen, look at the dots and click on them.<p>
    `,
    choices: ['OK'],
}
timeline.push(recalibrateInstructions);

let recalibrate = {
    timeline: [recalibrateInstructions, calibration, validationInstructions, validation],
    conditional_function: function () {
        var validation_data = jsPsych.data.get().filter({ task: 'validate' }).values()[0];
        return validation_data.percent_in_roi.some(function (x) {
            var minimum_percent_acceptable = 50;
            return x < minimum_percent_acceptable;
        });
    },
    data: {
        phase: 'recalibration'
    }
}
timeline.push(recalibrate);

let calibrationDone = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <p>Great, we're done with calibration!</p>
    `,
    choices: ['OK']
}
timeline.push(calibrationDone);

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
        let results = jsPsych.data
            .get()
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'Ib1PGFLsDH5z';
        let forceOSFSave = false;
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

// Debrief Trial //
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you for participating in this demo experiment!</h1> 
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