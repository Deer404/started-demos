import { error } from "console";
import { createReadStream, WriteStream } from "fs";
import { join, resolve } from "path";

async function readFileStream() {
    const petFilePath = join(import.meta.dirname, "data", "pet.txt")
    return new Promise((resolve, reject) => {
        let content = '';
        const stream = createReadStream(petFilePath, {
            encoding: "utf-8"
        });

        stream.on('data', (chunk) => {
            content += chunk
        })

        stream.on("end", () => {
            resolve(content)
        })

        stream.on("error", (error) => reject(error))
    })
}

async function main() {
    try {
        const petData = await readFileStream();
        console.log(petData);
    } catch (e) {
        console.log("error: ", e)
    }
}

main()