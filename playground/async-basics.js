/*jshint esversion: 6 */
console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback 2000');
}, 2000);

setTimeout(() => {
    console.log('Dentro del callback rapido de 100');
}, 0);

console.log('Finishing up');