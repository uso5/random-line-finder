const fs = require('fs');
const path = require('path');

// Check if the correct number of arguments is provided
if (process.argv.length !== 4) {
    console.log('Usage: node generate_files.js <number_of_lines> <output_file>');
    process.exit(1);
}

// Number of lines to generate (first argument)
const X = parseInt(process.argv[2], 10);

// Output file name (second argument)
const outputFile = path.resolve(`assets/${process.argv[3]}`);

// Function to generate a random string of a given length
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Generate the text file
const stream = fs.createWriteStream(outputFile, { flags: 'w' });

for (let i = 0; i < X; i++) {
    const length = Math.floor(Math.random() * 1000) + 1;

    const randomString = generateRandomString(length);

    stream.write(randomString + '\n');
}

stream.end(() => {
    console.log(`Generated ${X} lines with random characters in ${outputFile}`);
});