import { catchError } from "rxjs";
import { from } from "rxjs";
import { readFile } from "fs/promises";
import path from "path";
import process from "process";

const exampleFilePath = path.join(process.cwd(), "data", "example.txt");
function readFileRx(path) {
    return from(readFile(path, "utf-8")).pipe(
        catchError((err) => {
            console.error("Error reading file: ", err);
            return []
        })
    );
}

readFileRx(exampleFilePath).subscribe({
    next(data) {
        console.log("File Content: ", data);
    },
    error(err) {
        console.error("Error: ", err);
    },
    complete() {
        console.log("Complete");
    }
})