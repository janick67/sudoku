import {AppConstants} from './AppConstants';
import {Field} from "./Field";

export class Structure {
    fields: Field[];
    constructor() {
        this.fields = [];
    }
    static getIndexByPosition(_field) {
        throw Error('This method should be override.');
    }
    isCorrect() {
        if (this.fields.length !== AppConstants.FIELDS_IN_CORRECT_STRUCTURE) {
            return false;
        }
        const fieldsWithout0 = this.fields.filter(f => f.value > 0);
        const set = new Set(fieldsWithout0.map(f => f.value));
        return set.size === fieldsWithout0.length;
    }
}

export class Block extends Structure {
    static getIndexByPosition(field) {
        return Math.ceil(field.x / AppConstants.FIELDS_IN_SMALL_STRUCTURE) +
            (Math.ceil(field.y / AppConstants.FIELDS_IN_SMALL_STRUCTURE) - 1) * AppConstants.FIELDS_IN_SMALL_STRUCTURE - 1;
    }
}

export class HorizontalLine extends Structure{
    static getIndexByPosition(field) {
        return field.y - 1;
    }
}

export class VerticalLine extends Structure{
    static getIndexByPosition(field) {
        return field.x - 1;
    }
}
