import { Observable, share } from "rxjs";
import { watch } from "fs"
import path from "path";


const exampleFilePath = path.join(process.cwd(), "data", "example.txt");


/**
 * Watch a file for changes
 * @param {string} path - The path to the file to watch
 * @returns {Observable<{eventType: string, filename: string}>} - An observable that emits when the file changes
 */
function watchFile(path) {
    return new Observable(subscribe => {
        const watcher = watch(path, (eventType, filename) => {
            subscribe.next({ eventType, filename })
        })

        return () => watcher.close()
    }).pipe(share());
}

watchFile(exampleFilePath).subscribe({
    next(data) {
        console.log("File change: ", data);
    },
    error(err) {
        console.error("Error: ", err);
    },
    complete() {
        console.log("Complete");
    }
});