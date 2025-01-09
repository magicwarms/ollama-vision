export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    images?: ImageData[];
}

export interface ImageData {
    data: string;
    type: string;
}

export interface OllamaRequest {
    model: string;
    messages: ChatMessage[];
    stream: boolean;
}

export interface OllamaResponse {
    message: {
        content: string;
        role: string;
    };
}