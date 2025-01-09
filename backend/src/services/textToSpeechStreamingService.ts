import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, writeFileSync } from "fs";
import { writeFile } from "fs/promises";

export class TextToSpeechStreamingService {
    private static ELEVENLABS_API_KEY = "";

    private static client = new ElevenLabsClient({
        apiKey: this.ELEVENLABS_API_KEY,
    });

    static async generateSpeechFile(text: string) {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const audio = await this.client.generate({
                    voice: "Yuna",
                    model_id: "eleven_flash_v2_5",
                    text,
                });
                const fileName = `uploads/myAudio.mp3`;
                const fileStream = createWriteStream(fileName);
                audio.pipe(fileStream);
                fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
                fileStream.on("error", reject);
            } catch (error) {
                reject(error);
            }
        });
    }
}
