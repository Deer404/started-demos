import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { createGzip } from "zlib";
const petFilePath = join(import.meta.dirname, "data", "pet.txt")

const gzip = createGzip();

const source = createReadStream(petFilePath)

const destination = createWriteStream(join(import.meta.dirname, "data", "pet.txt.gz"))

source.pipe(gzip).pipe(destination)