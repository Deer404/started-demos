import { join, resolve } from "path";

const metaDirname = import.meta.dirname

const fullPath = join(import.meta.dirname,"data","pet.txt")

const absolutePath = resolve("./data/pet.txt")

console.log(`metaDirname ${metaDirname}`)

console.log(`fullPath ${fullPath}`)

console.log(`absolutePath ${absolutePath}`)
