import * as fs from 'fs';

/**
 * Gets a line from a file given the line number and the index.
 * @param filePath 
 * @param lineNumber 
 * @param index 
 * @returns 
 */ 
function getLine(filePath: string, lineNumber: number, index: number[]): string {
    let fd = fs.openSync(filePath, 'r');
    let buffer = Buffer.alloc(1000); // Allocate a buffer of 1000 bytes

    fs.readSync(fd, buffer, 0, 1000, index[lineNumber]);
    fs.closeSync(fd);

    return buffer.toString('utf-8').split('\n')[0].trim();
}

export { getLine };
