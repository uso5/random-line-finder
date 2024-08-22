import * as fs from 'fs';
import { buildIndex, loadIndex } from '../src/utils/indexer';

describe('buildIndex and loadIndex', () => {
    const mockFilePath = 'assets/indexerMockFile.txt';
    const mockIndexPath = 'assets/indexerMockIndex.txt';

    afterEach(() => {
        if (fs.existsSync(mockFilePath)) {
            fs.unlinkSync(mockFilePath);
        }
        if (fs.existsSync(mockIndexPath)) {
            fs.unlinkSync(mockIndexPath);
        }
    });

    it('should build an index file with correct byte offsets', async () => {
        const mockContent = `First line\nSecond line\nThird line\nFourth line`;
        fs.writeFileSync(mockFilePath, mockContent);
        await buildIndex(mockFilePath, mockIndexPath);

        const expectedOffsets = [0, 11, 23, 34];
        const indexData = fs.readFileSync(mockIndexPath, 'utf-8').split('\n').map(Number);

        expect(indexData).toEqual(expectedOffsets);
    });

    it('should correctly load the index file into an array', () => {
        const mockIndexContent = `0\n11\n23\n35`;
        fs.writeFileSync(mockIndexPath, mockIndexContent);

        const indexArray = loadIndex(mockIndexPath);
        expect(indexArray).toEqual([0, 11, 23, 35]);
    });

    it('should handle an empty file correctly when building an index', async () => {
        fs.writeFileSync(mockFilePath, '');

        await buildIndex(mockFilePath, mockIndexPath);

        const indexData = fs.readFileSync(mockIndexPath, 'utf-8').split('\n').filter(line => line !== '');
        expect(indexData.length).toBe(0); 
    });

    it('should handle a file with a single line correctly', async () => {
        fs.writeFileSync(mockFilePath, 'Only one line');

        await buildIndex(mockFilePath, mockIndexPath);

        const expectedOffsets = [0];
        const indexData = fs.readFileSync(mockIndexPath, 'utf-8').split('\n').map(Number);

        expect(indexData).toEqual(expectedOffsets);
    });

    it('should load an index file with trailing newline correctly', () => {
        const mockIndexContent = `0\n11\n23\n35`;
        fs.writeFileSync(mockIndexPath, mockIndexContent);

        const indexArray = loadIndex(mockIndexPath);
        expect(indexArray).toEqual([0, 11, 23, 35]);
    });
});