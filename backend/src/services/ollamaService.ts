import ollama from 'ollama'

export class OllamaService {
    static async generateResponse(message: string) {
        try {
            const response = await ollama.chat({
                model: 'llama3.2-vision',
                messages: [{
                    role: 'user',
                    content: message + ". Mohon dijawab dengan jelas dan singkat saja.",
                }],
            })

            return response
        } catch (error: any) {
            throw new Error(`Failed to generate response: ${error.message}`);
        }
    }

    static nanosecondsToMinutes(nanosSeconds: number) {
        const seconds = Math.floor(nanosSeconds / 1000000000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minutes and ${remainingSeconds} seconds`;
    }
}
