import { Field } from '../Field';

describe('Field', () => {
    describe('constructor', () => {
        test('should set the x and y values correctly', () => {
            const field = new Field(2, 3);
            expect(field.x).toBe(2);
            expect(field.y).toBe(3);
        });
    });

    describe('value', () => {
        test('should be set correctly', () => {
            const field = new Field(2, 3);
            field.value = 5;
            expect(field.value).toBe(5);
        });
    });
});
