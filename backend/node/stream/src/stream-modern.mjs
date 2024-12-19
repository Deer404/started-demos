import { open } from "fs/promises"
import { join } from "path";
const petFilePath = join(import.meta.dirname, "data", "pet.txt")

async function readFileModern() {
    try {
        const file = await open(petFilePath)

        const stream = file.createReadStream({
            encoding: "utf-8"
        });

        let content = ""
        for await (const chunk of stream) {
            content += chunk
        }

        await file.close()
        return content;
    } catch (error) {

    }
}

async function main() {
    try {
        const petData = await readFileModern();
        console.log(petData);
    } catch (e) {
        console.log("error: ", e)
    }
}

main()