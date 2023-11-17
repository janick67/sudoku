import {Board} from "../Board";
import {Block, HorizontalLine, Structure, VerticalLine} from "../Structure";
import {Field} from "../Field";

describe('Board', () => {
    let board: Board;

    beforeEach(() => {
        board = new Board(9, 3);
    });

    it('should throw error if board size is wrong', () => {
        expect(() => {
            new Board(12, 3);
        }).toThrowError('Incorrect board size, length of block to square should be equal length of line.');
    })

    it('should initialize fields correctly', () => {
        expect(board.fields.length).toBe(9 ** 2);
        expect(board.fields[0]).toBeInstanceOf(Field);
        expect(board.fields[0].value).toBe(0);
    });

    it('should initialize structures correctly', () => {
        expect(board.structures.length).toBe(3);
        expect(board.structures[0]).toBeInstanceOf(Array);
        expect(board.structures[0][0]).toBeInstanceOf(Block);
        expect(board.structures[1]).toBeInstanceOf(Array);
        expect(board.structures[1][0]).toBeInstanceOf(HorizontalLine);
        expect(board.structures[2]).toBeInstanceOf(Array);
        expect(board.structures[2][0]).toBeInstanceOf(VerticalLine);
    });

    it('should get fields into structure correctly', () => {
        expect(board.blocks.length).toBeGreaterThan(0);
        expect(board.blocks[0]).toBeInstanceOf(Block);
        expect(board.horizontalLine.length).toEqual(9);
        expect(board.horizontalLine[0]).toBeInstanceOf(HorizontalLine);
        expect(board.verticalLine.length).toBeGreaterThan(0);
        expect(board.verticalLine[0]).toBeInstanceOf(VerticalLine);
    });

    describe('getFieldsIntoStructure', () => {
        it('should return an array of fields for the given structure type', () => {
            const fields = board.getFieldsIntoStructure(Block);
            expect(fields.length).toBe(9);
            expect(fields[0]).toBeInstanceOf(Block);
            expect(fields[0].fields[0]).toBeInstanceOf(Field);
        });

        it('should assign the correct fields to the structure', () => {
            const fields = board.getFieldsIntoStructure(Block);
            expect(fields[0].fields.length).toBe(9);
            expect(fields[0].fields[0]).toBe(board.fields[0]);
            expect(fields[0].fields[1]).toBe(board.fields[1]);
            // Add more expectations for other fields if needed
        });
    });

    describe('isCorrect()', () => {
        let s11 = new Structure(9 ,3);
        let s12 = new Structure(9 ,3);
        let s21 = new Structure(9 ,3);
        let s22 = new Structure(9 ,3);
        beforeAll(() => {
            s11.isCorrect = () => true;
            s12.isCorrect = () => true;
            s21.isCorrect = () => true;
            s22.isCorrect = () => true;
        })
        test('should return true when all structures are correct', () => {
            board.structures = [
                [ s11, s12],
                [ s21, s22]
            ];
            const result = board.isCorrect();
            expect(result).toBe(true);
        });

        test('should return false when at least one structure is incorrect', () => {
            board.structures = [
                [ s11, s12],
                [ s21, s22]
            ];
            board.structures[0][0].isCorrect = () => false;
            const result = board.isCorrect();
            expect(result).toBe(false);
        });

        test('should return false when at least one structure is incorrect', () => {
            board.structures = [
                [ s11, s12],
                [ s21, s22]
            ];
            board.structures[1][1].isCorrect = () => false;
            const result = board.isCorrect();
            expect(result).toBe(false);
        });
    });

    describe('print()', () => {
        test('should print the correct output', () => {
            const fields = [
                new Field(1, 1, 1),
                new Field(2, 1, 2),
                new Field(3, 1, 3),
                new Field(4, 1, 4),
                new Field(1, 2, 5),
                new Field(2, 2, 6),
                new Field(3, 2, 7),
                new Field(4, 2, 8),
                new Field(1, 3, 1),
                new Field(2, 3, 2),
                new Field(3, 3, 3),
                new Field(4, 3, 4),
                new Field(1, 4, 5),
                new Field(2, 4, 6),
                new Field(3, 4, 7),
                new Field(4, 4, 8),
            ];
            const lengthOfBlockEdge = 2;
            const fieldsInCorrectStructure = 4;

            // Mock console.log
            console.log = jest.fn();

            // Call the print function
            board.print.call({ fields, lengthOfBlockEdge, fieldsInCorrectStructure });

            // Expect the correct output
            expect(console.log).toHaveBeenCalledWith('1 2  3 4\n5 6  7 8\n\n1 2  3 4\n5 6  7 8');
        });

        test('should handle empty fields array', () => {
            const fields = [];
            const lengthOfBlockEdge = 3;
            const fieldsInCorrectStructure = 3;

            // Mock console.log
            console.log = jest.fn();

            // Call the print function
            board.print.call({ fields, lengthOfBlockEdge, fieldsInCorrectStructure });

            // Expect an empty output
            expect(console.log).toHaveBeenCalledWith('');
        });
    });

});
