import { createReadStream, readFileSync } from "node:fs";
import http from "node:http"
const server = http.createServer(async function(req,res){
    // const data = readFileSync(import.meta.dirname+"/test.mjs",{encoding:"utf-8"});
    // res.end(data);
    createReadStream(import.meta.dirname+"/test.mjs").pipe(res);
});

server.listen(8000);