import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
const app = express()
const PORT = 5000;
import { WebSocketServer } from 'ws';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = app.listen(PORT, (err)=>{
    if (err) {
        console.log(err);
        return
    }
    console.log("Server started at "+PORT);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

wss.on('connection', (ws) => {
    console.log('Client connected, uid created');

    // Handle incoming messages from the client
    ws.on('message', (message) => {
        const data = JSON.parse(message)
        console.log(data);
        ws.send(JSON.stringify(data));
    });

    ws.on('close', ()=>{
        console.log("Closed");
    })
});