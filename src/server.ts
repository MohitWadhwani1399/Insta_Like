import app from './app';
import http from "http";
import dotenv from "dotenv";

dotenv.config();
let server: http.Server;
const PORT = process.env.PORT || 3000;
async function startServer(){
    server = app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();