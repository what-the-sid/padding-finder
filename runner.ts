import * as fs from 'fs';
import * as readline from 'readline';
import { checkNumberPadding } from './checkNumberPadding';

function parseLine(line: string): string[] | null {
    const trimmed = line.trim();
    if (trimmed === '') return null; // Ignore empty lines

    try {
        const parsed = JSON.parse(trimmed);
        if (!Array.isArray(parsed)) {
            console.error(`Skipping invalid line (not an array): ${trimmed}`);
            return null;
        }
        if (!parsed.every(item => typeof item === 'string')) {
            console.error(`Skipping invalid line (non-string elements): ${trimmed}`);
            return null;
        }
        return parsed;
    } catch (error) {
        console.error(`Skipping invalid JSON: ${trimmed}`);
        return null;
    }
}

async function run() {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error("Usage: npm run check <path-to-file>");
        process.exit(1);
    }

    try {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            const data = parseLine(line);
            if (data) {
                const result = checkNumberPadding(data);
                console.log(`${JSON.stringify(data)} -> ${result}`);
            }
        }
    } catch (error) {
        console.error(`Error reading file: ${error}`);
        process.exit(1);
    }
}

run();
