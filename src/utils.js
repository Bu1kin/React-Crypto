export function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

// export function capitalize(str) {
//     // str.substr(1) - значение строки с первого (второго) символа
//     return str.charAt(0).toUpperCase() + str.substr(1)
// }