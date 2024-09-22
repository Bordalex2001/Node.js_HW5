import path from "node:path";
import fs from "node:fs";
import { log } from "node:console";
import { Transform } from "node:stream";
import { setInterval, setTimeout } from "node:timers";
const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "data1.txt");
const readableStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

//#region Завдання 1
let delay = 0;

readableStream.on('data', (chunk) => {
    for (let char of chunk){
        delay += 100;
        setTimeout(() => {
            process.stdout.write(char);
        }, delay)
    }
});

readableStream.on('end', () => {
    log('\nЧитання файлу завершено');
});
readableStream.on('error', (err) => {
    console.error('\nПомилка читання: ', err);
});
//#endregion

//#region Завдання 2
const toUpperCase = new Transform({
    transform(chunk){
        this.push(chunk.toString().toUpperCase());
    }
}).on('data', (chunk) => {
    log(chunk.toString());
});

readableStream.pipe(toUpperCase);
//#endregion