import { createServer } from "node:http";

createServer(async function(req,res){
    res.setHeader("Content-Type","application/json");
    if(req.url === "/api/hello"){
        res.writeHead(200,{
            "Content-Type":"application/json"});
        res.end(JSON.stringify({
            message:"Hello world"
        }))
    }else{
        res.writeHead(404,{
            "Content-Type":"application/json"});
        res.end(JSON.stringify({
            message:"Not found"
        }))
    }
}).listen(8000,()=>{
    console.log("服务器启动 http://localhost:8000")
})