import { appendFile, readFile, writeFile } from "fs/promises";

async function read(){
    const content = await readFile(import.meta.dirname+"/data/pet.txt","utf-8");
    console.log(content)
}

async function write(){
    await appendFile(import.meta.dirname+"/data/pet.txt","\nrabbit","utf-8");
}

write();
read();