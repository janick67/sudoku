import {Field} from './Field';

export class Structure {
    fields: Field[];
    fieldsInCorrectStructure: number;
    lengthOfBlockEdge: number;
    constructor(_fieldsInCorrectStructure: number, _lengthOfBlockEdge: number) {
        this.fieldsInCorrectStructure = _fieldsInCorrectStructure;
        this.lengthOfBlockEdge = _lengthOfBlockEdge;
        this.fields = [];
    }
    getIndexByPosition(_field): number {
        throw Error('This method should be override.');
    }
    isCorrect() {
        if (this.fields.length !== this.fieldsInCorrectStructure) {
            return false;
        }
        if (this.isSomeIncorrectField()) {
            // console.error('Program should never come in here, fields should be always between 0 and fieldsInCorrectStructure!!!', this.fields);
            return false;
        }
        const fieldsWithout0 = this.fields.filter(f => f.value > 0);
        const set = new Set(fieldsWithout0.map(f => f.value));
        return set.size === fieldsWithout0.length;
    }

    private isSomeIncorrectField() {
        return this.fields.some(f => f.value > this.fieldsInCorrectStructure ||
            f.x > this.fieldsInCorrectStructure || f.y > this.fieldsInCorrectStructure) ||
            this.fields.some(f => f.value < 0 || f.x <= 0 || f.y <= 0);
    }
}

export class Block extends Structure {
    getIndexByPosition(field) {
        return Math.ceil(field.x / this.lengthOfBlockEdge) +
            (Math.ceil(field.y / this.lengthOfBlockEdge) - 1) * this.lengthOfBlockEdge - 1;
    }
}

export class HorizontalLine extends Structure{
    getIndexByPosition(field) {
        return field.y - 1;
    }
}

export class VerticalLine extends Structure{
    getIndexByPosition(field) {
        return field.x - 1;
    }
}
