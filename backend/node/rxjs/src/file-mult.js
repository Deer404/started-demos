import { readFile } from "fs/promises"
import { catchError, forkJoin, from, map, of } from "rxjs"


function processFiles(files) {
    const fileReads = files.map(files => from(readFile(files, "utf-8")).pipe(
        map(content => ({ filePath: files, content })),
        catchError(error => of({ files, error }))
    ));

    return forkJoin(fileReads);
}

processFiles(["./data/example.txt", "./data/example2.txt"]).subscribe({})