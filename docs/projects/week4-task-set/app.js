// // celciusToFahrenheit
// function celciusToFahrenheit(tempC) {
//     let tempF = (tempC * 1.8) + 32;
//     return tempF;
// }

// console.log(celciusToFahrenheit(10)); // 50
// console.log(celciusToFahrenheit(-5)); // 23



// convertTemp

function convertTemp(temp, convertTo) {
    if (convertTo == 'c') {
        return ((temp - 32) / 1.8);
    } else if (convertTo == 'f') {
        return ((temp * 1.8) + 32);
    }
}

console.log(convertTemp(10, 'c')); // -12.2222
console.log(convertTemp(10, 'f')); // 50