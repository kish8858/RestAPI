import http from 'http';
import { genrateLovePer } from './feature.js';
import fs from 'fs';

const home = fs.readFileSync("./index.html");

const server = http.createServer((req,res)=>{
    if(req.url === "/nopage"){
        res.end(genrateLovePer());
    }
    else if(req.url === "/"){
        res.end(home);
    }
    else if(req.url === "/Contact"){
        res.end("contact");
    }
    else if(req.url === "/about"){
        res.end("about page");
    }
    else{
        res.end("Page not found");
    }

});

server.listen(5000,()=>{
    
});