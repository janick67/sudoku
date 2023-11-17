import {Board} from './Board';
const b = new Board();
// b.fields.forEach(f => f.value = 0)
// b.blocks[0].fields.forEach(f => f.value = 0);
//b.horizontalLine[0].fields.forEach(f => f.value = 0);
// b.verticalLine[0].fields.forEach(f => f.value = 0);
// console.log('isCorrect: ' + b.verticalLine[0].isCorrect());
console.log(b.isCorrect());
b.print();
