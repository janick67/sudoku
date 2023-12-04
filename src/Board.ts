import {Block, HorizontalLine, Structure, VerticalLine} from './Structure';
import {Field} from './Field';

export class Board {
    fields: Field[] = [];
    structures: Structure[][] = [];
    blocks: Block[];
    horizontalLine: HorizontalLine[];
    verticalLine: VerticalLine[];
    fieldsInCorrectStructure: number;
    lengthOfBlockEdge: number;
    private tryCount: number;
    private maxIndex: number;
    private maxMaxIndex: number;

    constructor(_fieldsInCorrectStructure: number, _lengthOfBlockEdge: number) {
        if (_fieldsInCorrectStructure !== _lengthOfBlockEdge * _lengthOfBlockEdge) {
            throw Error('Incorrect board size, length of block to square should be equal length of line.');
        }
        this.fieldsInCorrectStructure = _fieldsInCorrectStructure;
        this.lengthOfBlockEdge = _lengthOfBlockEdge;
        for (let y = 1; y <= this.fieldsInCorrectStructure; y++) {
            for (let x = 1; x <= this.fieldsInCorrectStructure; x++) {
                const field = new Field(x, y);
                field.value = 0;
                this.fields.push(field);
            }
        }
        this.blocks = this.getFieldsIntoStructure(Block);
        this.horizontalLine = this.getFieldsIntoStructure(HorizontalLine);
        this.verticalLine = this.getFieldsIntoStructure(VerticalLine);
        this.structures.push(this.blocks);
        this.structures.push(this.horizontalLine);
        this.structures.push(this.verticalLine);
    }

    getFieldsIntoStructure<T extends Structure>(type: (new (fieldsInLine, length) => T)) {
        const structure = new Array(this.fieldsInCorrectStructure).fill(1)
            .map(() => new type(this.fieldsInCorrectStructure, this.lengthOfBlockEdge));

        this.fields.forEach(f => {
            // @ts-ignore,
            const index = structure[0].getIndexByPosition(f);
            structure[index].fields.push(f);
        });
        return structure;
    }

    generate() {
        let i = 0;
        let min = this.fieldsInCorrectStructure * this.fieldsInCorrectStructure;
        let max = 0;
        // let left = this.randomValue(0);
        do {
            i++;
            this.tryCount = 0;
            this.maxIndex = 0;
            let left = this.randomValue(0);
            if (left === 0) {
                break;
            }
            if (left < min && left != -1) {
                min = left;
                console.log('\n\n\nnowe minimum to: ' + min);
                this.print();
            }
            if (this.maxIndex > max) {
                max = this.maxIndex;
                console.log('\n\n\nnowe maximum to: ' + max);
                this.print();
            }
            if (i % 10000 === 0) {
                console.log('Iteracja nr: ' + i/1000 + ' tys');
            }
            this.clear();
        } while(this.isCorrect());
        console.log('Gotowa plansza, sprawdź sobie.\nPotrzebne było tyle iteracji: ' + i + '\nisCorrect:', this.isCorrect())
    }

    randomValue(index: number): number {
        if (index >= this.fieldsInCorrectStructure * this.fieldsInCorrectStructure) {
            return 0;
        }
        let possibleNumber = this.getPossibleValueForField(this.fields[index]);
        possibleNumber = possibleNumber.sort(() => .5 - Math.random());
        if (possibleNumber.length > 0) {
            let i = 0;
            let result = 0;
            do {
                this.fields[index].value = possibleNumber[i++];
                result = this.randomValue(index + 1);
                let s = ' '.repeat(index/2);
                // console.log(s + 'index: ' + index,' i: ' + i);
                if (result === 0 || result === -1) {
                    return result;
                }
            } while(possibleNumber.length > i)
            this.fields[index].value = 0;
            return result;
        } else {
            this.tryCount++;
            // console.log(this.tryCount);
            if (this.maxIndex < index) {
                this.maxIndex = index;
            }
            const left = this.fields.filter(f => f.value === 0).length;
            // console.log((this.fieldsInCorrectStructure ** 2) / 2.083);
            if ((this.maxIndex < this.fieldsInCorrectStructure * this.lengthOfBlockEdge && this.tryCount > 100) || this.tryCount > 100000) {
                // if (this.tryCount > 1000) {
                //     this.print();
                //     console.log('za długo index: ' + index + 'max index: ' + this.maxIndex);
                // }
                // console.log('index < 400', index);
                return -1;
            }

            return left;
        }
    }

    private getPossibleValueForField(field: Field) {
        const allNumbers: number[] = [];
        this.structures.forEach(s => {
            s.filter(x => x.fields.find(f => f === field))[0].fields.forEach(f => allNumbers.push(f.value));
        });
        return this.getArrayFrom1ToN(this.fieldsInCorrectStructure).filter(n => !allNumbers.includes(n));
    }

    private getArrayFrom1ToN(n: number) {
        const t = [...Array(n + 1).keys()];
        t.shift();
        return t;
    }

    private clear() {
        // console.log('clear');
        this.fields.forEach(f => f.value = 0);
    }

    isCorrect() {
        return !this.structures.some(sArray => sArray.some(s => !s.isCorrect()));
    }

    print() {
        console.log('\n');
        let s = '';
        this.fields.forEach(f => {
            if (this.fieldsInCorrectStructure > 9) {
                s += f.value < 10? 0 : '';
            }
            s += f.value;
            if (f.x === this.fieldsInCorrectStructure && f.y < this.fieldsInCorrectStructure) {
                s += '\n';
            }
            if (f.y % this.lengthOfBlockEdge === 0 && f.x === this.fieldsInCorrectStructure && f.y < this.fieldsInCorrectStructure) {
                s += '\n';
            }
            if (f.x < this.fieldsInCorrectStructure) {
                s+= ' ';
            }
            if (f.x % this.lengthOfBlockEdge === 0 && f.x < this.fieldsInCorrectStructure) {
                s += ' ';
            }
        });
        console.log(s);
    }
}
