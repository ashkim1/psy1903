// Welcome alert
alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.")

// Equations

// Trial 1
let start = Date.now();
let trial1 = prompt("What is 4 + 3?");
let end = Date.now();
let responseTime = (end - start) / 1000;
console.log(trial1, responseTime);
alert("You answered " + trial1 + " in " + responseTime + " seconds");

// Trial 2
start = Date.now();
let trial2 = prompt("What is 2 + 6?");
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial2, responseTime);
alert("You answered " + trial2 + " in " + responseTime + " seconds");

// Trial 3
start = Date.now();
let trial3 = prompt("What is 1 + 5?");
end = Date.now();
responseTime = (end - start) / 1000;
console.log(trial3, responseTime);
alert("You answered " + trial3 + " in " + responseTime + " seconds");

// Thank you alert
alert("Thank you for your participation!")
