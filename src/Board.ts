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

    getFieldsIntoStructure<T extends Structure>(type: (new (fieldsInLine, length) => T)) {;
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
        //TODO
    }

    isCorrect() {
        return !this.structures.some(sArray => sArray.some(s => !s.isCorrect()));
    }

    print() {
        let s = '';
        this.fields.forEach(f => {
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
