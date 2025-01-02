import { createReadStream } from "fs"
import { Observable } from "rxjs"
import { exampleFilePath } from "./constant.js";


/**
 * create a read stream for a file
 * @param {string} path 
 * @returns {Observable<Buffer>} - An observable that emits the file content
 */
function createFileStream(path) {
    return new Observable(subscribe => {
        const stream = createReadStream(path);
        stream.on('data', data => {
            subscribe.next(data);
        });
        stream.on('error', err => {
            subscribe.error(err);
        });
        stream.on('end', () => {
            subscribe.complete();
        });
        return () => stream.destroy();
    })
}

createFileStream(exampleFilePath).subscribe({
    next(data) {
        console.log("File Content: ", data.toString());
    },
    complete() {
        console.log("Complete");
    }
})