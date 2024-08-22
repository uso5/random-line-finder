import * as fs from 'fs';
import path from 'path';
import { getLine } from './utils/file-helper';
import { buildIndex, loadIndex } from './utils/indexer';
import { logger } from './utils/logger';

function validateAndParseArgs(): { filePath: string, lineNumber: number } {
    if (process.argv.length !== 4) {
        logger.error("Invalid number of arguments. Usage: npm run start -- <file_path> <line_number>");
        process.exit(1);
    }

    const filePath = process.argv[2];
    const lineNumber = parseInt(process.argv[3], 10);

    if (isNaN(lineNumber)) {
        logger.error(`Invalid line number: ${process.argv[3]}. It must be a number.`);
        process.exit(1);
    }

    return { filePath, lineNumber };
}

/**
 * Main function. Builds the index file if it doesn't exist, then gets and prints the specified line.
 * @param filePath 
 * @param lineNumber 
 */
async function main(): Promise<void> {
    let { filePath, lineNumber } = validateAndParseArgs();
    filePath = path.join(__dirname, '..', 'assets', filePath);
    if (!fs.existsSync(filePath)) {
        logger.error(`File not found: ${filePath}`);
        process.exit(1);
    }

    const indexPath = filePath + '.index';

    if (!fs.existsSync(indexPath)) {
        await buildIndex(filePath, indexPath);
    }

    let index: number[] = loadIndex(indexPath);

    if (lineNumber < 0 || lineNumber >= index.length) {
        logger.error(`Invalid line number: ${lineNumber}. It should be between 0 and ${index.length - 1}.`);
        process.exit(1);
    }

    let line: string = getLine(filePath, lineNumber, index);
    logger.info(line);
}

main();