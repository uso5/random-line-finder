import * as fs from 'fs';
import * as readline from 'readline';
import { logger } from './logger';

/**
 * Builds an index file for a given text file. The index file contains the byte offset of the start of each line in the text file.
 * @param filePath 
 * @param indexPath 
 */

async function buildIndex(filePath: string, indexPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        let currentOffset: number = 0;
        let isFirstLine = true;
        const indexStream = fs.createWriteStream(indexPath);

        rl.on('line', (line) => {
            if (isFirstLine) {
                indexStream.write(currentOffset.toString());    
                isFirstLine = !isFirstLine;
            } else {
                indexStream.write('\n'+ currentOffset);
            }
            logger.info(`Building index: ${currentOffset}`);
            currentOffset += Buffer.byteLength(line, 'utf-8') + 1; // +1 for the newline character
        });

        rl.on('close', () => {
            indexStream.end(); 
        });

        indexStream.on('finish', () => {
            logger.info('Index building completed.');
            resolve();
        });

        rl.on('error', (err) => {
            logger.error('Error while reading file:', err);
            reject(err); 
        });

        indexStream.on('error', (err) => {
            logger.error('Error while writing index:', err);
            reject(err); 
        });
    });
}

/**
 * Loads an index file into an array of numbers.
 * @param indexPath 
 * @returns 
 */
function loadIndex(indexPath: string): number[] {
    let indexContent: string = fs.readFileSync(indexPath, 'utf-8');
    return indexContent.split('\n').map(Number);
}

export { buildIndex, loadIndex };
