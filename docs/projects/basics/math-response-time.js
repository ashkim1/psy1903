// Welcome alert
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.")

// Equations

// Trial 1
let start = Date.now();
let randomNum1 = Math.floor(Math.random() * 10) + 1;
let randomNum2 = Math.floor(Math.random() * 10) + 1;
let trial1 = prompt("What is " + randomNum1 + " + " + randomNum2 + "?");
let end = Date.now();
let responseTime = (end - start) / 1000;
console.log(trial1, responseTime);
alert("You answered " + trial1 + " in " + responseTime + " seconds");

// Trial 2
start = Date.now();
randomNum1 = Math.floor(Math.random() * 10) + 1;
randomNum2 = Math.floor(Math.random() * 10) + 1;
let trial2 = prompt("What is " + randomNum1 + " + " + randomNum2 + "?");
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial2, responseTime);
alert("You answered " + trial2 + " in " + responseTime + " seconds");

// Trial 3
start = Date.now();
randomNum1 = Math.floor(Math.random() * 10) + 1;
randomNum2 = Math.floor(Math.random() * 10) + 1;
let trial3 = prompt("What is " + randomNum1 + " + " + randomNum2 + "?");
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial3, responseTime);
alert("You answered " + trial3 + " in " + responseTime + " seconds");

// Thank you alert
alert("Thank you for your participation!")
