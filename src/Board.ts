import {Block, HorizontalLine, Structure, VerticalLine} from "./Structure";
import {AppConstants} from './AppConstants';
import {Field} from './Field';

export class Board {
    fields: Field[] = [];
    structures: Structure[][] = [];
    blocks: Block[];
    horizontalLine: HorizontalLine[];
    verticalLine: VerticalLine[];
    constructor() {
        for (let y = 1; y <= AppConstants.FIELDS_IN_CORRECT_STRUCTURE; y++) {
            for (let x = 1; x <= AppConstants.FIELDS_IN_CORRECT_STRUCTURE; x++) {
                const field = new Field(x, y);
                field.value = x;
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

    getFieldsIntoStructure<T extends Structure>(type: (new () => T)) {
        const structure = new Array(AppConstants.FIELDS_IN_CORRECT_STRUCTURE).fill(1).map(() => new type());
        this.fields.forEach(f => {
            // @ts-ignore
            const index = type.getIndexByPosition(f);
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
            if (f.x === AppConstants.FIELDS_IN_CORRECT_STRUCTURE) {
                s += '\n';
            }
            if (f.y % AppConstants.FIELDS_IN_SMALL_STRUCTURE === 0 && f.x === AppConstants.FIELDS_IN_CORRECT_STRUCTURE) {
                s += '\n';
            }
            if (f.x < AppConstants.FIELDS_IN_CORRECT_STRUCTURE) {
                s+= ' ';
            }
            if (f.x % AppConstants.FIELDS_IN_SMALL_STRUCTURE === 0 && f.x < AppConstants.FIELDS_IN_CORRECT_STRUCTURE) {
                s += ' ';
            }
        });
        console.log(s);
    }
}
