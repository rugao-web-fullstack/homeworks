const http=require("http");
let port=process.env.NODE_PORT||8080;

http.createServer((req,res)=>{
    res.end("Hello world");
}).listen(port,()=>{
    console.log("Server started at:"+port);
});

