import express, { Request, RequestHandler, Response } from 'express';
import { CONFIG } from './config';
import { OllamaService } from './services/ollamaService';
import { TextToSpeechStreamingService } from './services/textToSpeechStreamingService';
import path from 'path';
import fs from 'fs';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// Middleware
app.use(express.json());


// CORS middleware
const corsMiddleware: RequestHandler = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    next();
};

app.use(corsMiddleware);

// Add request logging
app.use((req, _, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Serve static files
app.use(express.static('uploads'));

io.on('connection', (socket) => {
    console.log('a user connected with ID:', { socketId: socket.id });

    socket.on("submitMessage", async (message: string) => {
        console.log({ message });

        const response = await OllamaService.generateResponse(message);
        const messageResponse = response.message.content
        socket.emit("generateResponse", messageResponse);

        const isAudioGenerated = await TextToSpeechStreamingService.generateSpeechFile(messageResponse);
        if (isAudioGenerated) {
            socket.emit("audioReady", isAudioGenerated);
        }
    })
});

io.on('disconnect', () => {
    console.log('user disconnected');
})



// Routes
// app.get('/chat', async (req: Request, res: Response): Promise<any> => {
//     res.writeHead(200, {
//         "Connection": "keep-alive",
//         "Cache-Control": "no-cache",
//         "Content-Type": "text/event-stream",
//     });

//     const message = req.query.message;
//     if (!message || typeof message !== 'string') {
//         return res.status(400).json({ error: 'Message is required' });
//     }


// });

// Start server
httpServer.listen(CONFIG.PORT, () => {
    console.log(`Server running on port ${CONFIG.PORT}`);
});