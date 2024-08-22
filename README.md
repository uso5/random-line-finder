# Random Line Finder

## Installation

First, install the necessary dependencies:

```bash
npm install
```

## Generating Files

To generate a file with random lines:

```bash
node generate_files.js <number_of_lines> <output_file>
```

- <number_of_lines>: Number of lines to generate.
- <output_file>: Path to the output file (inside the assets directory).

example: `node generate_files.js 100 output.txt`

## Development

For development, you can use the following command:

`npm run start:dev -- <input_file> <line_index>`

- <input_file>: input file for getting ling
- <line_index>: index of line we need to get

example: `npm run start:dev -- output.txt 3`

Text files are stored inside assets folder

## Running Tests

`npm test`

## Building the Project

`npm run build`
