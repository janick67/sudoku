import {Block, HorizontalLine, Structure, VerticalLine} from '../Structure';
import {Field} from '../Field';

describe('Structure', () => {
    let structure: Structure;
    beforeEach(() => {
        structure = new Structure(9, 3);
    })

    it('should have the empty array', () => {
        expect(structure.fields.length).toBe(0);
    });

    it('should be incorrect with the empty array', () => {
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have fields count equal to fieldsInCorrectStructure', () => {
        structure.fieldsInCorrectStructure = 9;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 5});
        structure.fields.push({x:1, y:3, value: 9});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have unique values for the fields', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:1, y:3, value: 3});
        expect(structure.isCorrect()).toBe(true);
    });

    it('should have unique values for the fields but 0 can be duplicated', () => {
        structure.fieldsInCorrectStructure = 6;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:1, y:3, value: 3});
        structure.fields.push({x:1, y:4, value: 0});
        structure.fields.push({x:1, y:5, value: 0});
        structure.fields.push({x:1, y:6, value: 0});
        expect(structure.isCorrect()).toBe(true);
    });

    it('should have unique values for the fields but 0 can be duplicated', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:1, y:3, value: 1});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect value', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:2, y:1, value: 4});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect y', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:1, y:4, value: 1});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect x', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:6, y:1, value: 1});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect value negative', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:2, y:1, value: -1});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect y negative', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:1, y:-2, value: 1});
        expect(structure.isCorrect()).toBe(false);
    });

    it('should have only correct field - incorrect x negative', () => {
        structure.fieldsInCorrectStructure = 3;
        structure.fields.push({x:1, y:1, value: 1});
        structure.fields.push({x:1, y:2, value: 2});
        structure.fields.push({x:-2, y:1, value: 3});
        expect(structure.isCorrect()).toBe(false);
    });

    describe('getIndexByPosition', () => {
        describe('structure should throw error', () => {
            let s = new Structure(9, 3);
            const field = {}; // create a mock field object

            expect(() => {
                s.getIndexByPosition(field);
            }).toThrowError('This method should be override.');
        })

        describe('block', () => {
            const cases = [[9, 3, 5, 1, 1], [9, 3, 3, 2, 0], [9, 3, 5, 6, 4], [9, 3, 1, 9, 6], [9, 3, 9, 9, 8],
            [16, 4, 4, 1, 0], [16, 4, 5, 1, 1], [16, 4, 5, 5, 5], [16, 4, 16, 16, 15]];
            test.each(cases)('should return the correct index for a field in a block', (fieldsInLine, lengthOfBlockEdge,x, y, expectedIndex) => {
                const field = new Field(x, y);
                const index = new Block(fieldsInLine, lengthOfBlockEdge).getIndexByPosition(field);
                expect(index).toBe(expectedIndex);
            });
        });

        describe('horizontalLine', () => {
            const cases = [[5, 1, 0], [3, 2, 1], [5, 6, 5], [1, 9, 8]];
            test.each(cases)('should return the correct index for a field in a horizontal line', (x, y, expectedIndex) => {
                const field = new Field(x, y);
                const index = new HorizontalLine(9, 3).getIndexByPosition(field);
                expect(index).toBe(expectedIndex);
            });
        });

        describe('verticalLine', () => {
            const cases = [[5, 1, 4], [3, 2, 2], [5, 6, 4], [1, 9, 0], [9, 9, 8]];
            test.each(cases)('should return the correct index for a field in a vertical line', (x, y, expectedIndex) => {
                const field = new Field(x, y);
                const index = new VerticalLine(9, 3).getIndexByPosition(field);
                expect(index).toBe(expectedIndex);
            });
        });
    });
});
