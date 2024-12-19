import { createReadStream } from "node:fs"
import { join } from "node:path"

async function main() {
    const petFilePath = join(import.meta.dirname, "data", "pet.txt")

    const fileStream = createReadStream(petFilePath, {
        encoding: "utf-8",
        highWaterMark: 64 * 1024 // 64KB chunks
    })

    for await (let chunk of fileStream) {
        console.log(chunk)
    }

    fileStream.on("data", (data) => {
        console.log(data)
    })
}

main()