import { from, map, mergeMap } from 'rxjs';
import { readdir, readFile } from 'fs/promises';
import path from "path";

const exampleFilePath = path.join(process.cwd(), "data");

function readDirectory(dirPath) {
  return from(readdir(dirPath)).pipe(
    // 修改这里：不要使用 from(files)，直接使用数组
    mergeMap(files => files),
    map(file => path.join(dirPath, file)),
    mergeMap(filePath =>
      from(readFile(filePath, 'utf-8')).pipe(
        map(content => ({ filePath, content }))
      )
    )
  );
}

readDirectory(exampleFilePath).subscribe({
  next(data) {
    console.log("File Content: ", data);
  },
  error(err) {
    console.error("Error: ", err);
  },
  complete() {
    console.log("Complete");
  }
});