import {Board} from './Board';
var argv = require('minimist')(process.argv.slice(2));
console.log(argv.s);
const b = new Board(argv.s * argv.s, argv.s);
b.generate();
// b.fields.forEach(f => f.value = 0)
// b.blocks[0].fields.forEach(f => f.value = 0);
//b.horizontalLine[0].fields.forEach(f => f.value = 0);
// b.verticalLine[0].fields.forEach(f => f.value = 0);
// console.log('isCorrect: ' + b.verticalLine[0].isCorrect());
// console.log(b.isCorrect());
b.print();
