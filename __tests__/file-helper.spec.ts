import * as fs from 'fs';
import { getLine } from '../src/utils/file-helper';

describe('getLine', () => {
    const mockFilePath = 'assets/helperMockFile.txt';

    beforeEach(() => {
        const mockContent = `apple
banana
orange
lemon`;
        fs.writeFileSync(mockFilePath, mockContent);
    });

    afterEach(() => {
    
        fs.unlinkSync(mockFilePath);
    });

    it('should return the correct line for a given line number and index', () => {
        const index = [0, 6, 13, 20]; 

        expect(getLine(mockFilePath, 0, index)).toBe('apple');
        expect(getLine(mockFilePath, 1, index)).toBe('banana');
        expect(getLine(mockFilePath, 2, index)).toBe('orange');
    });

    it('should return an empty string if the line is empty', () => {
        const mockContent = `First line\n\nThird line`;
        fs.writeFileSync(mockFilePath, mockContent);
        const index = [0, 11, 12, 24];

        expect(getLine(mockFilePath, 1, index)).toBe(''); 
    });

    it('should throw an error if the file does not exist', () => {
        const invalidFilePath = 'invalidFile.txt';
        const index = [0];

        expect(() => getLine(invalidFilePath, 0, index)).toThrowError();
    });
});